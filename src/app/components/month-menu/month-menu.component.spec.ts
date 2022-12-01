import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MonthMenuComponent} from './month-menu.component';

describe('MenuComponent', () => {
    let component: MonthMenuComponent;
    let fixture: ComponentFixture<MonthMenuComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MonthMenuComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(MonthMenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
