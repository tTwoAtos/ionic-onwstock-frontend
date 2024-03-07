import { LocalDatabaseInterfaceService } from "./local-database.interface.service";
import { LocalDatabaseService } from "./local-database.service"


describe(`Test OfflineStorageService class`, () => {

    let service: Promise<LocalDatabaseInterfaceService>;

    beforeEach(async () => {
        //service = LocalDatabaseService.getInstance();
    })


    it(`Should be a singleton`, () => {
        let service1 = service;
        let service2 = LocalDatabaseService.getInstance();

        //expect(service1).toBe(service2);
    })

    it(`Should have a store`, async () => {

        console.log("Transaction in progress...")

        let db!: IDBDatabase;



        let instance = await service
        instance.request.onsuccess = (event: any) => {
            console.log("Request on success")

            db = event.target.result

        }

        instance.request.onerror = (event: any) => {
            throw new Error("Request on ERROR !")
        }

        instance.request.onupgradeneeded = (event: any) => {
            console.log("Request on upgrade")
        }

        console.log(instance.db.transaction(instance.USERS_STORE_NAME, "readonly").objectStore(instance.USERS_STORE_NAME).name)

        expect(instance.db.transaction(instance.USERS_STORE_NAME, "readonly").objectStore(instance.USERS_STORE_NAME).name).toEqual("users")

    })

    // it(`Should add a user in the "users" store`, () => {
    //     let newUser = {
    //         id: "15efg6",
    //         lastname: "Test",
    //         firstname: "Test2",
    //         birthdate: "1999/02/01",
    //         role: "Admin"
    //     }

    //     service.add(service.USERS_STORE_NAME, newUser)

    //     expect(service.db.objectStoreNames.length).toEqual(1)
    // })
})