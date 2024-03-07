import { Observable } from "rxjs"
import { Product } from "src/app/tab2/types/product.type"

export interface UpdateProduct {
    updateProduct(communityId:String, product: Product): Observable<Product>
}