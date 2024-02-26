

export class OfflineStorageService {

    private static instance: OfflineStorageService

    constructor() { }

    /**
     * The static method that controls the access to the singleton instance.
     *
     * This implementation let you subclass the OfflineStorageService class while keeping
     * just one instance of each subclass around.
     */
    static getInstance(): OfflineStorageService {
        if (!OfflineStorageService.instance) {
            OfflineStorageService.instance = new OfflineStorageService()
        }

        return OfflineStorageService.instance
    }
}