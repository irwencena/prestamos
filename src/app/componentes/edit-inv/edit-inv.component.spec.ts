import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInvComponent } from './edit-inv.component';

describe('EditInvComponent', () => {
  let component: EditInvComponent;
  let fixture: ComponentFixture<EditInvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditInvComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditInvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
