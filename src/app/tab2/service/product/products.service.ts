import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'
import { Product } from '../../types/product.type'
import { IProductsInterfaceService } from './interface/products.interface.service'

@Injectable({
  providedIn: 'root'
})

export class ProductsService implements IProductsInterfaceService {
  constructor(private http: HttpClient) { }

  /**
   * Retrieves the list of products from the server.
   * @returns An Observable that emits the response containing the products.
   */
  getProducts(): Observable<any> {
    const headers = new HttpHeaders()
      .set('ngrok-skip-browser-warning', 'true')
    return this.http.get(environment.API_LOCAL + '/products', { headers: headers })
  }

  /**
   * Adds a product to a community.
   * @param product - The product to be added.
   * @param communityID - The ID of the community.
   * @returns An Observable that emits the response from the server.
   */
  addProduct(product: Product, communityID: string): Observable<any> {
    return this.http
      .post(environment.API_URL + '/product-to-community/' + communityID, {
        ...product,
        productId: product.eancode,
        qte: product.quantity
      })
  }

  /**
   * Retrieves products by community ID.
   * @param communityId The ID of the community.
   * @returns An Observable that emits the response containing the products.
   */
  getProductsByCommunity(communityId: string): Observable<any> {
    const headers = new HttpHeaders()
      .set('ngrok-skip-browser-warning', 'true')
    return this.http.get(environment.API_LOCAL + `api/v1/product-to-community/{communityId}`, { headers: headers })
  }

  /**
   * Updates a product.
   * 
   * @param product - The product to be updated.
   * @param productToCommunityID - The ID of the product to community relationship.
   * @returns An Observable that emits the updated product.
   */
  updateProduct(product: Product, productToCommunityID: number): Observable<any> {
    return this.http.put(environment.API_LOCAL + '/product-to-community/' + productToCommunityID, {
      ...product,
      productId: product.eancode,
      qte: product.quantity
    })
  }
}
