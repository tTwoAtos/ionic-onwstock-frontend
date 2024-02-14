import { Component } from '@angular/core'
import { productcard } from './static/productcard.page'
import { pubcards } from './static/pubcard.page'
import ItemCard from './types/itemcards.type'

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page {
  numberOfProducts: number = 0
  combinedData: ItemCard[] = []
  public cardsData = productcard
  public pubData = pubcards

  constructor() { }

  ngOnInit() {
    let pubIndex = 0

    for (let i = 0; i < this.cardsData.length; i++) {
      this.combinedData.push(this.cardsData[i])
      if ((i + 1) % 3 === 0 && pubIndex < this.pubData.length) {
        this.combinedData.push(this.pubData[pubIndex])
        pubIndex++
      }
    }
  }

  /** public getNumberOfProducts() {
    this.numberOfProducts = this.cardsData.length

    if (this.numberOfProducts === 5) {
      return add.pubData === 1
    }
  }*/
}