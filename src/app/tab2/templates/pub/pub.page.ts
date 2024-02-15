import { Component } from "@angular/core"
import { pubcards } from "../../static/pubcard.page"

@Component({
    selector: 'pub-page',
    templateUrl: 'pub.page.html',
    styleUrls: ['pub.page.scss']
})

export class PubPage {
    pubData = pubcards
    numOfAds: number = 0
    adThreshold: number = 10

    constructor() { }

    ngOnInit() {
        this.regulateNumOfAds()
    }

    regulateNumOfAds() {
        if (this.numOfAds < this.adThreshold) {
            this.numOfAds++
        } else {
            this.numOfAds = 0
        }
    }
}