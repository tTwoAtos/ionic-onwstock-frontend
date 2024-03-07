import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ModalAddEmplacementComponent } from './modal-add-emplacement/modal-add-emplacement.component';
import { ModalAddOrUpdateProductComponent } from './modal-add-or-update-product/modal-add-or-update-product.component';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [ModalAddOrUpdateProductComponent, ModalAddEmplacementComponent],
    declarations: [ModalAddOrUpdateProductComponent, ModalAddEmplacementComponent]
})
export class ModalsModule { }
