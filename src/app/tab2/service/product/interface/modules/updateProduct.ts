import { Observable } from "rxjs"
import { Product } from "src/app/tab2/types/product.type"

export interface UpdateProduct {
    updateProduct(communityId:string, product: Product): Observable<Product>
}