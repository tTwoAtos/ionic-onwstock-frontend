import { Observable } from "rxjs"
import { Product } from "src/app/tab2/types/product.type"

export interface AddProducts {
    addProduct(product: Product, communityID: string): Observable<Product>
}