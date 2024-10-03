import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelecitemComponent } from './selecitem.component';

describe('SelecitemComponent', () => {
  let component: SelecitemComponent;
  let fixture: ComponentFixture<SelecitemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelecitemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelecitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
