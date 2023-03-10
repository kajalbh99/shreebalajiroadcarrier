import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintChallanComponent } from './print-challan.component';

describe('PrintChallanComponent', () => {
  let component: PrintChallanComponent;
  let fixture: ComponentFixture<PrintChallanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintChallanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintChallanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
