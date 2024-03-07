import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, lastValueFrom, take } from 'rxjs'
import { environment } from 'src/environments/environment'
import { Product } from '../../types/product.type'
import { IProductsInterfaceService } from './interface/products.interface.service'
import { LocalDatabaseService } from 'src/services/offline-storage/local-database.service'
import { LocalDatabaseInterfaceService } from 'src/services/offline-storage/local-database.interface.service'

@Injectable({
  providedIn: 'root'
})

export class ProductsService implements IProductsInterfaceService {

  private localDbServiceInstance: LocalDatabaseInterfaceService

  constructor(private http: HttpClient) {

    this.localDbServiceInstance = LocalDatabaseService.getInstance()
  }

  async getProducts(): Promise<Product[]> {
    const service = await this.localDbServiceInstance.setup()

    // Products in local DB
    const response = await service.getAll(service.PRODUCTS_STORE).then((localDbObjects) => {
      return localDbObjects
    })

    if (response?.result && response.result.length > 0) {
      return response.result
    }

    const headers = new HttpHeaders()
      .set('ngrok-skip-browser-warning', 'true')

    const request = this.http.get(environment.API_LOCAL + '/products', { headers: headers }).pipe(take(100))
    const data: Product[] = await lastValueFrom<any>(request)


    for (let i = 0; i < data.length; i++) {
      let product = await service.get(service.PRODUCTS_STORE, data[i].eancode)


      if (!product)
        service.addOrUpdate(service.PRODUCTS_STORE, data[i])
    }

    return data
  }


  saveProduct(barcode: string): Observable<any> {
    const headers = new HttpHeaders()
    return this.http
      .get(environment.API_LOCAL + '/products/' + barcode, {
        headers: headers
      })
  }

  /**
   * Adds a product to a community.
   * @param product - The product to be added.
   * @param communityID - The ID of the community.
   * @returns An Observable that emits the response from the server.
   */
  async addProduct(product: Product, communityID: string): Promise<Product> {
    const localDbService = await this.localDbServiceInstance.setup()

    const request = this.http
      .post(environment.API_LOCAL + '/product-to-community/' + communityID, {
        ...product,
        productId: product.eancode,
        qte: product.quantity
      })

    const data: Product = await lastValueFrom<any>(request)

    if (data) {
      localDbService.addOrUpdate(this.localDbServiceInstance.PRODUCT_TO_COMMUNITY_STORE, product)
    }

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

    // !!! To check after merg when all method of ProductService is done
    const response = await localDbService.getProductsByCommunity(localDbService.PRODUCT_TO_COMMUNITY_STORE, communityId).then((localDbObjects) => {
      console.log(localDbObjects);

      //return localDbObjects;
    })

    // if (response.length > 0) {
    //   return response
    // }

    const headers = new HttpHeaders()
      .set('ngrok-skip-browser-warning', 'true')

    const request = this.http.get(environment.API_LOCAL + `/product-to-community/${communityId}`, { headers: headers })
    const data: any[] = await lastValueFrom<any>(request)

    for (let i = 0; i < data.length; i++) {
      const product = data[i];

      localDbService.addOrUpdate(localDbService.PRODUCTS_STORE, product)
      localDbService.addOrUpdateProductToCommunity(localDbService.PRODUCT_TO_COMMUNITY_STORE, product, communityId)

    }

    return data
  }

  async getProductByID(eancode: string): Promise<any> {

    console.log("Test get products by id");

    const service = await this.localDbServiceInstance.setup()

    let product = await service.get(service.PRODUCTS_STORE, eancode)

    if (!product) {

      const headers = new HttpHeaders()
        .set('ngrok-skip-browser-warning', 'true')

      const request = this.http.get(environment.API_LOCAL + `api/v1/products/${eancode}`, { headers: headers })
      const data: Product = await lastValueFrom<any>(request)

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
    const request = this.http.put(environment.API_LOCAL + '/product-to-community/' + productToCommunityID, {
      ...product,
      productId: product.eancode,
      qte: product.quantity
    })

    return false
  }
}
