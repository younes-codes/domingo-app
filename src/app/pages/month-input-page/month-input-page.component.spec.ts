import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthInputPageComponent } from './month-input-page.component';

describe('MonthInputPageComponent', () => {
  let component: MonthInputPageComponent;
  let fixture: ComponentFixture<MonthInputPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MonthInputPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthInputPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
