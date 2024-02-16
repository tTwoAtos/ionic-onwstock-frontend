import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { IProductsInterfaceService } from './interface/products.interface.service'

@Injectable({
  providedIn: 'root'
})

export class ProductsService implements IProductsInterfaceService {
  private apiUrl = 'http://localhost:5000/api/v1/products'
  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    return this.http.get(this.apiUrl)
  }
}
