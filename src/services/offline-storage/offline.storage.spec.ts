import { OfflineStorageService } from "./offline.storage.service"

describe(`Test OfflineStorageService class`, () => {

    let service : OfflineStorageService;

    beforeEach(() => {
        service = OfflineStorageService.getInstance();
    })

    it(`Should be a singleton`, () => {
        let service1 = service;
        let service2 = OfflineStorageService.getInstance();

        expect(service1).toEqual(service2);
    })
})