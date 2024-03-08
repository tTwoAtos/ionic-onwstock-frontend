import { Component } from '@angular/core'
import { communityId } from 'src/const'
import { PubPageComponent } from './pub/pub.component'
import { ProductsService } from './service/product/products.service'
import { Product } from './types/product.type'

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page {
  cards: Product[] = []
  product: Product
  isModalOpen: boolean = false
  public deleteMode: boolean = false
  public listToDelete: string[] = []

  constructor(
    private productService: ProductsService,
    private pubImpl: PubPageComponent
  ) { }

  ngOnInit() {
    /*this.productcard = productcard */
    this.generateCards()
    this.pubImpl.getPubData()
  }
  
  towardBasket(){
    location.href="/tabs/tab1"
  }

  generateCards() {
    let pubIndex: number = 0
    this.productService.getProductsByCommunity(communityId).subscribe(listIDproducts => {
      this.cards = listIDproducts

      for (let i = 0; i < this.cards.length; i++) {
        this.pubImpl.regulateNumOfAds()
      }
    })
  }


  // Update factor
  addQuantity(product: Product) {
    product.quantity++
    this.updateProductBdd(product)
  }
  removeQuantity(product: Product) {
    product.quantity--
    if (product.quantity === 0){ 
      this.cards= this.cards.filter((prod)=> prod.eancode !== product.eancode)

      this.listToDelete.push(product.eancode)
      this.delete()
      this.listToDelete = []

    }else{
      this.updateProductBdd(product)
    }
  }

  async updateProductBdd(prod : Product): Promise<void>{
    this.productService.updateProduct(communityId,this.product)
  }


  //Suppression mod
  togleDeleteMode() {
    this.deleteMode = !this.deleteMode
    
    if (!this.deleteMode)
      this.listToDelete = []
  }

  delete() {
    if (this.listToDelete.length > 0){

      this.productService.massDelete(communityId, this.listToDelete).then(() => {
        console.log("please refresh the list");
        this.generateCards()
        this.togleDeleteMode()
    })
  }
  }


  getIdFromListToDelete(eancode: string) {
    return this.listToDelete.includes(eancode)
  }
  toggleSelection(eancode: string) {
    if (!this.deleteMode) return

    if (this.listToDelete.includes(eancode))
      this.listToDelete = this.listToDelete.filter(id => id != eancode)
    else
      this.listToDelete.push(eancode)
  }
}