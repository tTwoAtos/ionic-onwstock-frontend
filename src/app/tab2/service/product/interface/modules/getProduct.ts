import { Observable } from 'rxjs'

export interface GetProducts {
    getProducts(): Observable<any>
    getProductsByCommunity(ComId: string): Observable<any>
}