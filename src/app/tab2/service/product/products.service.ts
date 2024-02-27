import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'
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

  addProduct(): Observable<any> {
    const headers = new HttpHeaders()
      .set('ngrok-skip-browser-warning', 'true')
    return this.http.get(environment.API_URL + '/products', { headers: headers })
  }
}
