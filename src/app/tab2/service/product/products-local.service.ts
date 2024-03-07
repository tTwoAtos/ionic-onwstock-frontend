import { Injectable } from '@angular/core'
import { Product } from '../../types/product.type'
import { IProductsInterfaceService } from './interface/products.interface.service'
import { LocalDatabaseService } from 'src/services/offline-storage/local-database.service'
import { LocalDatabaseInterfaceService } from 'src/services/offline-storage/local-database.interface.service'
import { ProductsService } from './products.service'

@Injectable({
  providedIn: 'root'
})

export class ProductsServiceLocal implements IProductsInterfaceService {

  private localDbServiceInstance: LocalDatabaseInterfaceService


  constructor(private productService: ProductsService) {

    this.localDbServiceInstance = LocalDatabaseService.getInstance()
  }

  async getProducts(): Promise<Product[]> {
    const localDbService = await this.localDbServiceInstance.setup()

    // Products in local DB
    const response = await localDbService.getAll(localDbService.PRODUCTS_STORE).then((localDbObjects) => {
      return localDbObjects
    })

    if (response?.result && response.result.length > 0) {
      return response.result
    }

    const products = await this.productService.getProducts()


    for (let i = 0; i < products.length; i++) {
      let product = await localDbService.get(localDbService.PRODUCTS_STORE, products[i].eancode)


      if (!product)
        localDbService.addOrUpdate(localDbService.PRODUCTS_STORE, products[i])
    }

    return products
  }


  async saveProduct(barcode: string): Promise<any> {

    const service = await this.localDbServiceInstance.setup()

    let product = await service.get(service.PRODUCTS_STORE, barcode)

    if (!product) {
      this.productService.saveProduct(barcode).then((productData) => {
        return productData
      })
    }

    return product
  }

  /**
   * Adds a product to a community.
   * @param product - The product to be added.
   * @param communityID - The ID of the community.
   * @returns An Observable that emits the response from the server.
   */
  async addProduct(product: Product, communityID: string): Promise<Product> {
    const localDbService = await this.localDbServiceInstance.setup()

    const data = await this.productService.addProduct(product, communityID)

    localDbService.addOrUpdate(this.localDbServiceInstance.PRODUCT_TO_COMMUNITY_STORE, product)

    return data
  }

  /**
   * Retrieves products by community ID.
   * @param communityId The ID of the community.
   * @returns An Observable that emits the response containing the products.
   */
  async getProductsByCommunity(communityId: string): Promise<Product[]> {

    const products: Product[] = [];

    const localDbService = await this.localDbServiceInstance.setup()

    // !!! To check after merge when all method of ProductService is done
    const response = await localDbService.getProductsByCommunity(localDbService.PRODUCT_TO_COMMUNITY_STORE, communityId).then((localDbObjects) => {

      return localDbObjects;
    })

    if (response != undefined && response.length > 0) {
      return response
    }

    const data = await this.productService.getProductsByCommunity(communityId)

    for (let i = 0; i < data.length; i++) {
      const product = data[i];

      localDbService.addOrUpdate(localDbService.PRODUCTS_STORE, product)
      localDbService.addOrUpdateProductToCommunity(localDbService.PRODUCT_TO_COMMUNITY_STORE, product, communityId)

    }

    return data
  }

  async getProductByID(eancode: string): Promise<any> {

    const service = await this.localDbServiceInstance.setup()

    let product = await service.get(service.PRODUCTS_STORE, eancode)

    if (!product) {

      const data = await this.productService.getProductsByID(eancode)

      service.addOrUpdate(service.PRODUCTS_STORE, data)

      return data
    }

    return product
  }

  /**
   * Updates a product.
   * 
   * @param product - The product to be updated.
   * @param productToCommunityID - The ID of the product to community relationship.
   * @returns An Observable that emits the updated product.
   */
  async updateProduct(product: Product, productToCommunityID: number): Promise<boolean> {

    let localDBresult = await this.localDbServiceInstance.addOrUpdateProductToCommunity(this.localDbServiceInstance.PRODUCT_TO_COMMUNITY_STORE, product, productToCommunityID.toString())

    let result = await this.productService.updateProduct(product, productToCommunityID)

    return localDBresult && result
  }
}
