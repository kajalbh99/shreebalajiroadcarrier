import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculateBillComponent } from './calculate-bill.component';

describe('CalculateBillComponent', () => {
  let component: CalculateBillComponent;
  let fixture: ComponentFixture<CalculateBillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalculateBillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculateBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
