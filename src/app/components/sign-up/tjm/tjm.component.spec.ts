import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TjmComponent } from './tjm.component';

describe('TjmComponent', () => {
  let component: TjmComponent;
  let fixture: ComponentFixture<TjmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ TjmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TjmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
