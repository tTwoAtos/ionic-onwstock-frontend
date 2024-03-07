import { Observable } from 'rxjs'
import { Product } from 'src/app/tab2/types/product.type'

export interface GetProducts {
    getProductsByCommunity(communityID: string): Promise<Product[]>
    getProducts(): Promise<Product[]>
}