import { LocalDatabaseInterfaceService } from "./local-database.interface.service";
import { Observable, of } from "rxjs";
import { map } from 'rxjs/operators';
import { Product } from "src/app/tab2/types/product.type";
import ProductCard from "src/app/tab2/types/productcard.type";

export class LocalDatabaseService implements LocalDatabaseInterfaceService {

    private static _instance: LocalDatabaseService

    /**
     * Access of the database
     */
    private _request!: IDBOpenDBRequest;

    get request() {
        return this._request
    }

    /**
     * Contain the local database
     */
    private _db!: IDBDatabase;

    get db() {
        return this._db
    }

    private _dbVersion: number = 10;

    private userStore: IDBObjectStore
    private productStore: IDBObjectStore
    private communityStore: IDBObjectStore
    private productToCommunityStore: IDBObjectStore

    private readonly dbName = "UserStockDatabase"

    public readonly USERS_STORE: string = "users"
    public readonly PRODUCTS_STORE: string = "products"
    public readonly COMMUNITIES_STORE: string = "communities"
    public readonly PRODUCT_TO_COMMUNITY_STORE: string = "product_to_community"


    /**
     * The static method that controls the access to the singleton instance.
     *
     * This implementation let you subclass the LocalDatabaseService class while keeping
     * just one instance of each subclass around.
     */
    public static getInstance(): LocalDatabaseService {

        if (!LocalDatabaseService._instance) {

            // Setup the service at the initialization
            LocalDatabaseService._instance = new LocalDatabaseService()
        }
        else {
            console.log("instance before setup")

            // Setup the service at the initialization
            LocalDatabaseService._instance = new LocalDatabaseService()
        }

        return LocalDatabaseService._instance
    }

    public setup(): Promise<LocalDatabaseService> {

        return new Promise((resolve, reject) => {

            let result

            // no support
            if (!('indexedDB' in window)) reject('not supported');

            // Create the database
            this._request = window.indexedDB.open(this.dbName, this._dbVersion);

            this._request.onerror = (event: any) => {
                reject(`IndexedDB error: ${this._request.error}`);
            }

            this._request.onsuccess = (event: any) => {

                this._db = event.target.result

                resolve(this)
            }

            this._request.onupgradeneeded = (event: any) => {

                result = event.target.result

                this._db = event.target.result

                this.userStore = this.createUsersStore(event.target.result)
                this.productStore = this.createProductStore(event.target.result)
                this.communityStore = this.createCommunityStore(event.target.result)
                this.productToCommunityStore = this.createProductToCommunityStore(event.target.result)
            }

        })
    }

    private createUsersStore(database: IDBDatabase): IDBObjectStore {
        const store = database.createObjectStore(this.USERS_STORE, { autoIncrement: true })

        store.createIndex("id", "user_id", { unique: true })
        store.createIndex("lastname", "user_lastname", { unique: false })
        store.createIndex("firstname", "user_firstname", { unique: false })
        store.createIndex("birthdate", "user_birthdate", { unique: false })
        store.createIndex("role", "user_role", { unique: false })

        return store
    }

    private createProductStore(database: IDBDatabase): IDBObjectStore {
        const store = database.createObjectStore(this.PRODUCTS_STORE, { autoIncrement: true })

        store.createIndex("name", "product_name", { unique: false })
        store.createIndex("nbScanned", "product_nb_scanned", { unique: false })
        store.createIndex("nbAdded", "product_nb_added", { unique: false })
        store.createIndex("thumbnail", "product_thumbnail", { unique: false })
        store.createIndex("eancode", "product_eancode", { unique: true })

        return store
    }

    private createCommunityStore(database: IDBDatabase): IDBObjectStore {
        const store = database.createObjectStore(this.COMMUNITIES_STORE, { autoIncrement: true })

        store.createIndex("id", "community_id", { unique: true })
        store.createIndex("label", "community_label", { unique: false })
        store.createIndex("	street_number", "community_street_number", { unique: false })
        store.createIndex("address", "community_address", { unique: false })
        store.createIndex("address_detail", "community_address_detail", { unique: false })
        store.createIndex("city_id", "community_city_id", { unique: false })

        return store
    }

    private createProductToCommunityStore(database: IDBDatabase): IDBObjectStore {
        const store = database.createObjectStore(this.PRODUCT_TO_COMMUNITY_STORE, { autoIncrement: true })

        store.createIndex("community_id", "product_to_community_community_id", { unique: false })
        store.createIndex("product_id", "product_to_community_product_id", { unique: false })
        store.createIndex("emplacement_id", "product_to_community_emplacement_id", { unique: false })
        store.createIndex("qte", "product_to_community_qte", { unique: false })

        return store
    }

    //#region database operations

    /**
     * 
     * @param storeName where you want to add a object
     * @param objectToadd what you want to add
     */
    public addOrUpdate(storeName: string, objectToAdd: Product): Promise<boolean> {

        return new Promise((resolve, reject) => {
            const transaction = this._db.transaction(storeName, 'readwrite')

            const store = transaction.objectStore(storeName)

            const newProductIndex: any = {
                name: objectToAdd.name,
                nbScanned: objectToAdd.nbAdded,
                nbAdded: objectToAdd.nbAdded,
                thumbnail: objectToAdd.thumbnail,
                eancode: objectToAdd.eancode,
            }

            store.put(newProductIndex, newProductIndex.eancode);

            transaction.oncomplete = () => {
                resolve(true);
            };

            transaction.onerror = () => {
                reject(transaction.error);
            };
        })
    }

    public addOrUpdateProductToCommunity(storeName: string, objectToAdd: any, communityID: string): Promise<boolean> {

        return new Promise((resolve, reject) => {

            const transaction = this._db.transaction(storeName, 'readwrite')

            const store = transaction.objectStore(storeName)

            const newProductToCommunityObject = {
                community_id: communityID,
                product_id: objectToAdd.eancode,
                emplacement_id: objectToAdd.emplacement_id,
                qte: objectToAdd.quantity,
            }

            store.put(newProductToCommunityObject, communityID)


            transaction.oncomplete = () => {
                resolve(true);
            };

            transaction.onerror = () => {
                reject(transaction.error);
            };
        })
    }

    /**
     * 
     * @param storeName 
     * @param idObject ID of the object we want to delete 
     */
    public async delete(storeName: string, idObject: IDBValidKey | IDBKeyRange): Promise<boolean> {

        return new Promise((resolve, reject) => {

            const transaction = this._db.transaction(storeName, "readwrite")
            const store = transaction.objectStore(storeName)
            store.delete(idObject)

            transaction.oncomplete = () => {
                resolve(true)
            }

            transaction.onerror = () => {
                reject(transaction.error)
            }
        })
    }


    public get(storeName: string, idObject: IDBValidKey | IDBKeyRange): Promise<Product> {
        return new Promise((resolve, reject) => {
            const transaction = this._db.transaction(storeName, 'readonly')
            const store = transaction.objectStore(storeName)
            const object: any = store.get(idObject)

            const productData: Product = {
                name: object.name,
                nbScanned: object.nbScanned,
                nbAdded: object.nbAdded,
                thumbnail: object.thumbnail,
                eancode: object.eancode,
                quantity: 0
            }

            transaction.oncomplete = () => {
                resolve(productData)
            }

            transaction.onerror = () => {
                reject(transaction.error)
            }
        })
    }

    public getAll(storeName: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const transaction = this._db.transaction(storeName, 'readonly')
            const store = transaction.objectStore(storeName)
            const objects = store.getAll()

            transaction.oncomplete = () => {
                resolve(objects)
            }

            transaction.onerror = () => {
                reject(transaction.error)
            }
        })
    }

    public getProductsByCommunity(storeName: string, communityID: string): Promise<Product[]> {

        return new Promise((resolve, reject) => {
            const transaction = this._db.transaction(storeName, 'readonly')
            const store = transaction.objectStore(storeName)
            const allObjects = store.getAll()

            let productList: Product[]

            transaction.oncomplete = () => {
                const allObjectByCommunityID = allObjects.result.filter((object => object.community_id === communityID))

                for (let i = 0; i < allObjectByCommunityID.length; i++) {
                    const productID = allObjectByCommunityID[i].product_id;


                    this.get(this.PRODUCTS_STORE, productID).then((dataProduct) => {

                        if (dataProduct.eancode != undefined) {
                            productList.push(dataProduct)
                        }

                    })
                }

                resolve(productList)
            }

            transaction.onerror = () => {
                reject(transaction.error)
            }
        })
    }

    //#endregion


}