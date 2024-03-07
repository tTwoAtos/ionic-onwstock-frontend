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

  // TODO: call service to update the quantity of the product
  removeQuantity(product: Product, index: number) {
    product.quantity--
    // this.productcard[index].quantity = product.quantity
    /* this.productService.updateProduct(product, productToCommunityID).subscribe(updatedProduct => {
    this.product = updatedProduct
      })
    /*localStorage.setItem('productcard', JSON.stringify(this.productcard))*/
    const removeBtn: HTMLIonFabButtonElement | null = document.getElementById(`removeQte${index}`) as HTMLIonFabButtonElement
    if (product.quantity === 0) removeBtn.disabled = true
  }

  // TODO: call service to increase the quantity of the product
  addQuantity(product: Product, index: number) {
    product.quantity++
    // this.product[index].quantity = product.quantity
    /* this.productService.updateProduct(product, productToCommunityID).subscribe(updatedProduct => {
      this.product = updatedProduct
    })
    /*localStorage.setItem('Product', JSON.stringify(this.Product))*/
    const removeBtn: HTMLIonFabButtonElement | null = document.getElementById(`removeQte${index}`) as HTMLIonFabButtonElement
    removeBtn.disabled = false
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