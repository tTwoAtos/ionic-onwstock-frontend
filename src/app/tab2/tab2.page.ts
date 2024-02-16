import { Component } from '@angular/core'
import { ProductsService } from './service/product/products.service'
import { PubPage } from './templates/pub/pub.page'

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page {
  cards: any[] = []

  constructor(
    private productService: ProductsService,
    private pubImpl: PubPage
  ) { }

  ngOnInit() {
    this.generateCards()
    this.pubImpl.getPubData()
  }

  generateCards() {
    let pubIndex: number = 0
    this.productService.getProducts().subscribe(datas => {
      this.cards = datas

      for (let i = 0; i < this.cards.length; i++) {
        this.pubImpl.regulateNumOfAds()

        if ((i + 1) % 3 === 0) {
          this.cards.splice(i, 0, this.pubImpl.pubData[pubIndex])
          pubIndex++
        }
      }
    })
  }
}