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

  getProducts(): Observable<any> {
    const headers = new HttpHeaders()
      .set('ngrok-skip-browser-warning', 'true')
    return this.http.get(environment.API_URL + '/products', { headers: headers })
  }

  addProduct(product: Product, communityID: string): Observable<any> {
    return this.http
      .post(environment.API_URL + '/product-to-community/' + communityID, {
        ...product,
        productId: product.eancode,
        qte: product.quantity
      })
  }

  updateProduct(product: Product, productToCommunityID: number): Observable<any> {
    return this.http.put(environment.API_URL + '/product-to-community/' + productToCommunityID, {
      ...product,
      productId: product.eancode,
      qte: product.quantity
    })
  }
}
