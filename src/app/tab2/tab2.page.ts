import { Component } from '@angular/core'
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

  constructor(
    private productService: ProductsService,
    private pubImpl: PubPageComponent
  ) { }

  ngOnInit() {
    this.generateCards()
    this.pubImpl.getPubData()
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
}