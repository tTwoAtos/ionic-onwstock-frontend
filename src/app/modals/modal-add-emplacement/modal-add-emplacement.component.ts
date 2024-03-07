import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { EmplacementsService } from 'src/services/pub/emplacement.service';
import { Emplacement } from 'src/types/emplacement.type';
@Component({
  selector: 'modal-add-emplacement',
  templateUrl: './modal-add-emplacement.component.html',
  styleUrls: ['./modal-add-emplacement.component.scss'],
})

export class ModalAddEmplacementComponent implements OnInit {
  @Input() emplacement: Emplacement = {} as Emplacement;
  @Input() isModalOpen: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false); // = false;
  public form: FormGroup;
  @Output() refreshList: EventEmitter<any> = new EventEmitter<any>();

  constructor(private emplcacementService: EmplacementsService, public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', Validators.compose([
        Validators.required,
      ])]
    })
  }

  toggle() {
    const isModelOpen = this.isModalOpen.getValue
    this.isModalOpen.next(!isModelOpen)
  }

  async closeModal() {
    this.isModalOpen.next(false)
    this.emplacement = {} as Emplacement
  }

  async cancel() {
    this.form.reset()

    this.closeModal()
  }
  async confirm() {
    if (!this.form.valid) return

    this.emplacement.communityId = "testCom"
    const res = await this.emplcacementService.add(this.emplacement).catch((error: any) => console.log(error))

    if (res) {
      this.refreshList.emit()
      this.closeModal()
    }
  }
}