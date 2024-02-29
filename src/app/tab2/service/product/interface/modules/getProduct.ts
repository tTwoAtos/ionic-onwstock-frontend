import { Observable } from 'rxjs'
import { Product } from 'src/app/tab2/types/product.type'

export interface GetProducts {
    getProducts(): Observable<Product>
    getProductsByCommunity(communityID: string): Observable<Product>
}