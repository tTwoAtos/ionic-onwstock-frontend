import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddOrUpdateProductComponent } from './modal-add-emplacement.component';

describe('ModalAddOrUpdateProductComponent', () => {
  let component: ModalAddOrUpdateProductComponent;
  let fixture: ComponentFixture<ModalAddOrUpdateProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalAddOrUpdateProductComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ModalAddOrUpdateProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
