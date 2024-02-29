import { AddProducts } from "./modules/addProduct"
import { GetProducts } from "./modules/getProduct"
import { UpdateProduct } from "./modules/updateProduct"

export interface IProductsInterfaceService
    extends GetProducts, AddProducts, UpdateProduct { }