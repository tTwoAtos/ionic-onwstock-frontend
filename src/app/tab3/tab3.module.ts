import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab3PageRoutingModule } from './tab3-routing.module';
import { ModalAddEmplacementComponent } from '../modals/modal-add-emplacement/modal-add-emplacement.component';
import { ModalsModule } from '../modals/modals';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab3PageRoutingModule,
    ModalsModule
  ],
  declarations: [Tab3Page]
})
export class Tab3PageModule {}
