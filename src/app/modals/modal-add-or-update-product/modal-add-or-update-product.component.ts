import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/tab2/types/product.type';
import { ProductsService } from './../../tab2/service/product/products.service';
@Component({
  selector: 'modal-add-or-update-product',
  templateUrl: './modal-add-or-update-product.component.html',
  styleUrls: ['./modal-add-or-update-product.component.scss'],
})

export class ModalAddOrUpdateProductComponent implements OnInit {
  @Input() product: Product;
  @Input() updateMode: boolean = false;
  @Input() isModalOpen = false;
  public form: FormGroup;

  constructor(private productService: ProductsService, public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.product = {
      ...this.product,
      quantity: 1
    }

    this.form = this.formBuilder.group({
      name: ['', Validators.compose([
        Validators.required,
      ])],
      quantity: ['', Validators.compose([
        Validators.required,
        Validators.min(1),
      ])]
    })
  }

  toggle() {
    this.isModalOpen = !this.isModalOpen
  }

  async closeModal() {
    this.isModalOpen = false
  }

  async cancel() {
    this.form.reset()

    this.closeModal()
  }
  async confirm() {
    if (!this.form.valid) return

    if (this.updateMode) {
      this.productService.updateProduct(this.product, 10).then(datas => {
        console.log(datas);
      })
    }

    else {
      this.productService.addProduct(this.product, 'testCom').then(datas => {
        console.log(datas);
      })
    }
  }
}