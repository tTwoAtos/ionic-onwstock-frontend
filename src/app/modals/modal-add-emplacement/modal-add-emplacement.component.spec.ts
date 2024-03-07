import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalAddEmplacementComponent } from './modal-add-emplacement.component';


describe('ModalAddOrUpdateProductComponent', () => {
  let component: ModalAddEmplacementComponent;
  let fixture: ComponentFixture<ModalAddEmplacementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalAddEmplacementComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ModalAddEmplacementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
