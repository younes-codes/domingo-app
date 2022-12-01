import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MonthLinkComponent} from './month-link.component';

describe('MonthSummaryComponent', () => {
    let component: MonthLinkComponent;
    let fixture: ComponentFixture<MonthLinkComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MonthLinkComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(MonthLinkComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
