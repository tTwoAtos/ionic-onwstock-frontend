import { Component } from '@angular/core'
import { productcard } from './productcard.page'
import { pubcards } from './pubcard.page'

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

}