import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthInputErrorMessageComponent } from './month-input-error-message.component';

describe('MonthInputErrorMessageComponent', () => {
  let component: MonthInputErrorMessageComponent;
  let fixture: ComponentFixture<MonthInputErrorMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MonthInputErrorMessageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthInputErrorMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
