import { Component } from '@angular/core'
import { productcard } from './static/productcard.page'
import { PubPage } from './templates/pub/pub.page'

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page {
  numberOfProducts: number = 0
  cards: any[] = []
  cardsData = productcard
  pubDatas = new PubPage().pubData
  regulateAdds = new PubPage().regulateNumOfAds()

  constructor() {
    let pubIndex: number = 0
    for (let i = 0; i < this.cardsData.length; i++) {
      this.cards.push(this.cardsData[i])
      this.regulateAdds
      if ((i + 1) % 3 === 0) {
        this.cards.push(this.pubDatas[pubIndex])
        pubIndex++
      }
    }
  }
}