import { Observable } from 'rxjs'
import { Product } from 'src/app/tab2/types/product.type'

export interface GetPub {
    getPub(): Observable<Product>
}