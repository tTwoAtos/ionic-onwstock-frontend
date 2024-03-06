import { Component } from "@angular/core"
import { PubService } from "../service/pubs/pub.service"
import { Product } from "../types/product.type"
import { pubcards } from "../static/pubcard.page"
@Component({
  selector: 'pub-page',
  templateUrl: 'pub.component.html',
  styleUrls: ['pub.component.scss']
})

export class PubPageComponent {
  pubData: Product
  numOfAds: number = 0
  adThreshold: number = 10
  pubcard: typeof pubcards

  constructor(private pubService: PubService) { }

  ngOnInit() {
    this.pubcard = pubcards
    // this.getPubData()
    // this.regulateNumOfAds()
  }

  getPubData() {
    this.pubService.getPub().subscribe(
      datas => {
        this.pubData = datas
        console.log(this.pubData)
      },
      error => {
        console.log('Error: ', error)
      }
    )
  }

  regulateNumOfAds() {
    if (this.numOfAds < this.adThreshold) {
      this.numOfAds++
    } else {
      this.numOfAds = 0
    }
  }
}