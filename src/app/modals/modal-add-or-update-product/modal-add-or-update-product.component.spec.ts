import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddOrUpdateUserComponent } from './modal-add-or-update-product.component';

describe('ModalAddOrUpdateUserComponent', () => {
  let component: ModalAddOrUpdateUserComponent;
  let fixture: ComponentFixture<ModalAddOrUpdateUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalAddOrUpdateUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalAddOrUpdateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
