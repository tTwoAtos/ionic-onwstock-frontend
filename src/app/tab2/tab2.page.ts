import { APP_INITIALIZER, Component, Inject, Optional } from '@angular/core'
import { PubPageComponent } from './pub/pub.component'
import { ProductsService } from './service/product/products.service'
import { Product } from './types/product.type'
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning'

import { productcard } from './static/productcard.page'
import ProductCard from './types/productcard.type'
import { ProductsServiceLocal } from './service/product/products-local.service'
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

  constructor(private productService: ProductsServiceLocal, private pubImpl: PubPageComponent) { }

  ngOnInit() {
    this.generateCards().then(() => {

      let newProductCards: ProductCard[] = []

      for (let i = 0; i < this.cards.length; i++) {
        let product = this.cards[i];

        let card: ProductCard;
        card = {
          alt: product.name,
          thumbnail: product.thumbnail,
          name: product.name,
          quantity: product.quantity,
          category: [""]
        }


        newProductCards.push(card)
      }

      this.productcard = newProductCards
      this.pubImpl.getPubData()
    })
  }



  async scan(): Promise<void> {
    if (this.isAvailable) {
      const { barcodes } = await BarcodeScanner.scan()
      this.barcodes.push(...barcodes)
    }
    if (this.barcodes.length > 0) {
      this.productService.saveProduct(this.barcodes[0].rawValue).then(
        datas => {
          this.product = datas
          this.isModalOpen = true
        }
      )
    }
  }

  async generateCards(): Promise<unknown> {

    return new Promise((resolve, reject) => {

      let pubIndex: number = 0
      const communityID = 'testCom'
      this.productService.getProductsByCommunity(communityID).then(listIDproducts => {

        this.cards = listIDproducts
        console.log(this.cards);


        for (let i = 0; i < this.cards.length; i++) {
          this.pubImpl.regulateNumOfAds()

          if ((i + 1) % 3 === 0) {
            // this.cards.splice(i, 0, this.pubImpl.pubData[pubIndex])
            pubIndex++
          }
        }

        resolve(true)
      })
    })
  }

  removeQuantity() {
    const removeBtn: HTMLIonFabButtonElement | null = document.getElementById('removeBtn') as HTMLIonFabButtonElement
    for (let product of this.productcard)
      product.quantity--
    if (this.product.quantity === 0) {
      removeBtn.disabled = true
    }

  }

  addQuantity() {
    for (let product of this.productcard)
      product.quantity++
  }
}