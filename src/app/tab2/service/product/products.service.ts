import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, lastValueFrom } from 'rxjs'
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
    return this.http.get(environment.API_URL + '/products', { headers: headers })
  }


  /**
   * Saves a product using the given barcode.
   *
   * @param {string} barcode - The barcode of the product to be saved.
   * @return {Observable<any>} The observable for the HTTP request.
   */
  saveProduct(barcode: string): Observable<any> {
    const headers = new HttpHeaders()
    return this.http
      .get(environment.API_URL + `/products/${barcode}`, {
        headers: headers
      })
  }

  /**
   * Adds a product to a community.
   * @param product - The product to be added.
   * @param communityId - The ID of the community.
   * @returns An Observable that emits the response from the server.
   */
  addProduct(product: Product, communityId: string): Observable<any> {
    //console.log(product, communityId)
    const headers = new HttpHeaders()
    return this.http
      .post(environment.API_LOCAL + `/product-to-community/${communityId}`, {
        productId: product.eancode,
        communityId: communityId,
        qte: product.quantity
      },
        { headers: headers })
  }


  /**
   * Retrieves products by community ID.
   * @param communityId The ID of the community.
   * @returns An Observable that emits the response containing the products.
   */
  getProductsByCommunity(communityId: string): Observable<any> {
    const headers = new HttpHeaders()
      .set('ngrok-skip-browser-warning', 'true')
    return this.http.get(environment.API_URL + `/product-to-community/${communityId}`, { headers: headers })
  }


  /**
   * Retrieves products by ID.
   *
   * @param {string} code - the ID of the product
   * @return {Observable<any>} the products retrieved by ID
   */
  getProductsByID(code: string): Observable<any> {
    const headers = new HttpHeaders()
      .set('ngrok-skip-browser-warning', 'true')
    return this.http.get(environment.API_URL + `/products/${code}`, { headers: headers })
  }

  /**
   * Updates a product.
   * 
   * @param product - The product to be updated.
   * @param productToCommunityID - The ID of the product to community relationship.
   * @returns An Observable that emits the updated product.
   */
  updateProduct(communityId: string, product: Product): Observable<any> {
    const headers = new HttpHeaders()
    return this.http.put(environment.API_URL + `/product-to-community/${communityId}/${product.eancode}`, {
      qte: product.quantity
    }, { headers: headers })
  }

  /**
   * Deletes multiple products associated with a community.
   *
   * @param {string} productToCommunityID - the ID of the product to community mapping
   * @param {string[]} productIds - an array of product IDs to be deleted
   * @return {Promise<any>} a Promise that resolves with the result of the deletion request
   */
  massDelete(productToCommunityID: string, productIds: string[]): Promise<any> {
    const headers = new HttpHeaders()
      .set('ngrok-skip-browser-warning', 'true')

    const request = this.http.delete(environment.API_URL + '/product-to-community/' + productToCommunityID, { headers: headers, body: [...productIds] })
    return lastValueFrom<any>(request)
  }
}
