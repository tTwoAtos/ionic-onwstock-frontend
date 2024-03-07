import { Observable } from "rxjs";
import { LocalDatabaseService } from "./local-database.service";
import { Product } from "src/app/tab2/types/product.type";

export interface LocalDatabaseInterfaceService {

    readonly USERS_STORE: string
    readonly PRODUCTS_STORE: string
    readonly COMMUNITIES_STORE: string
    readonly PRODUCT_TO_COMMUNITY_STORE: string

    get db(): IDBDatabase

    get request(): IDBOpenDBRequest

    setup(): Promise<LocalDatabaseService>

    addOrUpdate(storeName: string, objectToAdd: any): Promise<boolean>
    addOrUpdateProductToCommunity(storeName: string, objectToAdd: any, communityID: string): Promise<boolean>

    delete(storeName: string, idObject: IDBValidKey | IDBKeyRange): Promise<boolean>

    get(storeName: string, idObject: IDBValidKey | IDBKeyRange): Promise<Product>

    getAll(storeName: string): Promise<Product[]>

    getProductsByCommunity(storeName: string, communityID: string): Promise<Product[]>
}