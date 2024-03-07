import { CommonModule } from '@angular/common'
import { NgModule, APP_INITIALIZER } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { IonicModule } from '@ionic/angular'
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module'
import { Tab2Page } from './tab2.page'

import { PubPageComponent as PubPage } from './pub/pub.component'
import { ModalsModule } from '../modals/modals'
import { Tab2PageRoutingModule } from './tab2-routing.module'
import { ProductsService } from './service/product/products.service'

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab2PageRoutingModule,
    ModalsModule
  ],

  providers: [
    PubPage,
    {
      provide: APP_INITIALIZER,
      useFactory: ProductsService,
      multi: true,
    },
  ],

  declarations: [
    Tab2Page,
    PubPage
  ]
})
export class Tab2PageModule { }
