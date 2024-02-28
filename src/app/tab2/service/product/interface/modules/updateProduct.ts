import { Observable } from "rxjs"
import { Product } from "src/app/tab2/types/product.type"

export interface UpdateProduct {
    updateProduct(product: Product, productToCommunityID: number): Observable<Product>
}