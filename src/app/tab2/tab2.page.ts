import { Component } from '@angular/core'
import { PubPageComponent } from './pub/pub.component'
import { ProductsService } from './service/product/products.service'
import { Product } from './types/product.type'
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning'

import { productcard } from './static/productcard.page'
import ProductCard from './types/productcard.type'
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
  productcard: typeof productcard

  constructor(
    private productService: ProductsService,
    private pubImpl: PubPageComponent
  ) { }

  ngOnInit() {
    this.productcard = productcard
    // this.generateCards()
    this.pubImpl.getPubData()
  }

  async scan(): Promise<void> {
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
    const communityID = 'testCom'
    this.productService.getProductsByCommunity(communityID).subscribe(listIDproducts => {
      this.cards = listIDproducts

      for (let i = 0; i < this.cards.length; i++) {
        this.pubImpl.regulateNumOfAds()
      }
    })
  }

  removeQuantity(product: ProductCard, index: number) {
    product.quantity--
    const removeBtn: HTMLIonFabButtonElement | null = document.getElementById(`removeQte${index}`) as HTMLIonFabButtonElement
    if (product.quantity === 0) removeBtn.disabled = true
  }

  addQuantity(product: ProductCard, index: number) {
    product.quantity++
    const removeBtn: HTMLIonFabButtonElement | null = document.getElementById(`removeQte${index}`) as HTMLIonFabButtonElement
    removeBtn.disabled = false
  }
}