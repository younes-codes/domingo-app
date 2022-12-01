import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MonthFormComponent} from './month-form.component';

describe('FormMonthComponent', () => {
    let component: MonthFormComponent;
    let fixture: ComponentFixture<MonthFormComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MonthFormComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(MonthFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
