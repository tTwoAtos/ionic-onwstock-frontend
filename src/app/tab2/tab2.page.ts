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
  constructor() { }

  public cardsData = productcard
  public pubData = pubcards

  public getNumberOfProducts() {
    this.numberOfProducts = this.cardsData.length

    if (this.numberOfProducts === 5) {
      /** return add.pubData === 1*/
    }
  }
}