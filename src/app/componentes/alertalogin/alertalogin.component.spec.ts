import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertaloginComponent } from './alertalogin.component';

describe('AlertaloginComponent', () => {
  let component: AlertaloginComponent;
  let fixture: ComponentFixture<AlertaloginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertaloginComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlertaloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
