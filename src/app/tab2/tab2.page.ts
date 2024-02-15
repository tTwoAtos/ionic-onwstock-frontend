import { Component } from '@angular/core'
import { productcard } from './static/productcard.page'
import { pubcards } from './static/pubcard.page'

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page {
  numberOfProducts: number = 0
  public cards: any[] = []
  public cardsData = productcard
  public pubData = pubcards

  constructor() {
    let pubIndex: number = 0
    for (let i = 0; i < this.cardsData.length; i++) {
      this.cards.push(this.cardsData[i])
      if ((i + 1) % 3 === 0) {
        this.cards.push(this.pubData[pubIndex])
        pubIndex++
      }
    }
  }
}