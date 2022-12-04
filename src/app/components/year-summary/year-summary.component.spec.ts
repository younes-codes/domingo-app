import {ComponentFixture, TestBed} from '@angular/core/testing';

import {YearSummaryComponent} from './year-summary.component';

describe('SummaryComponent', () => {
    let component: YearSummaryComponent;
    let fixture: ComponentFixture<YearSummaryComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [YearSummaryComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(YearSummaryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
