import { Observable } from 'rxjs'

export interface GetProducts {
    getProducts(): Observable<any>
}