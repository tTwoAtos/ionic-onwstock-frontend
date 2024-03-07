import { Component } from '@angular/core'
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning'
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
  isAvailable = true
  barcodes: any[] = []
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

  async scan(): Promise<void> {
    if (this.deleteMode) {
      this.delete()
      return
    }

    if (this.isAvailable) {
      const { barcodes } = await BarcodeScanner.scan()
      this.barcodes.push(...barcodes)
    }
    if (this.barcodes.length > 0) {
      this.productService.saveProduct(this.barcodes[0].rawValue).subscribe(
        datas => {
          this.product = datas
          this.isModalOpen = true
        }
      )
    }
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

  removeQuantity(product: Product) {
    product.quantity--
    if (product.quantity === 0) this.cards= this.cards.filter((prod)=> prod.eancode !== product.eancode)
  }

  addQuantity(product: Product) {
    product.quantity++
  }

  togleDeleteMode() {
    this.deleteMode = !this.deleteMode

    if (!this.deleteMode)
      this.listToDelete = []
  }

  delete() {
    if (this.listToDelete.length == 0) return

    this.productService.massDelete(communityId, this.listToDelete).then(() => {
      console.log("please refresh the list");

      this.generateCards()
      this.togleDeleteMode()
    })
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