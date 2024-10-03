import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPrestamoComponent } from './add-prestamo.component';

describe('AddPrestamoComponent', () => {
  let component: AddPrestamoComponent;
  let fixture: ComponentFixture<AddPrestamoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPrestamoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddPrestamoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
