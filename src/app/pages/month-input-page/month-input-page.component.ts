import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MonthMenuComponent} from "../../components/month-menu/month-menu.component";
import {MonthsForecast} from "../../models/forecast.model";
import {Subscription} from "rxjs";
import {ActivatedRoute, Params} from "@angular/router";
import {Store} from "@ngrx/store";
import * as fromApp from "../../store/app.reducer";
import {MonthFormComponent} from "../../components/month-form/month-form.component";
import {
    MonthSummaryComponent
} from "../../components/month-summary/month-summary.component";
import {User} from "../../models/user.model";
import {ForecastService} from "../../services/forecast.service";

@Component({
    selector: 'app-month-input-page',
    standalone: true,
    imports: [CommonModule, MonthMenuComponent, MonthFormComponent, MonthSummaryComponent],
    templateUrl: './month-input-page.component.html',
    styleUrls: ['./month-input-page.component.scss']
})
export class MonthInputPageComponent implements OnInit, OnDestroy {

    nextMonth: MonthsForecast;

    previousMonth: MonthsForecast;
    monthParam: string;

    index: number;
    monthForecast: MonthsForecast;
    paramSub: Subscription;
    forecastMonthSub: Subscription;

    storeSub: Subscription;
    user: User;

    constructor(private route: ActivatedRoute,
                private store: Store<fromApp.AppState>,
                private forecastService: ForecastService
    ) {
    }

    ngOnInit() {
        this.monthParam = this.route.snapshot.params['month'];
        this.paramSub = this.route.params.subscribe((params: Params) => {
            this.monthParam = params['month'];
            this.forecastMonthSub = this.forecastService.forecast.subscribe(value => {
                if (!value) {
                    this.storeSub = this.store.select("forecastMonth").subscribe((v) => {
                        this.setUpMethods(v);
                    })
                    return;
                }
                this.setUpMethods(value);
            });
        });
        const user: User = JSON.parse(localStorage.getItem('user'));
        if (user) {
            this.user = user;
        }
    }

    ngOnDestroy(): void {
        if (this.paramSub) {
            this.paramSub.unsubscribe();
        }
        if (this.forecastMonthSub) {
            this.forecastMonthSub.unsubscribe();
        }

        if (this.storeSub) {
            this.storeSub.unsubscribe()
        }
    }

    private getNextMonth = (m: MonthsForecast[]): MonthsForecast => this.index === 0 ? m[m.length - 1] : m[this.index - 1]

    private getPreviousMonth = (m: MonthsForecast[]): MonthsForecast => this.index === m.length - 1 ? m[0] : m[this.index + 1]

    private setUpMethods = (monthForecast: MonthsForecast[]): void => {
        this.monthForecast = monthForecast.find((obj: MonthsForecast) => obj.month === this.monthParam);
        this.index = monthForecast.findIndex((obj: MonthsForecast) => obj.month === this.monthParam);
        this.nextMonth = this.getNextMonth(monthForecast);
        this.previousMonth = this.getPreviousMonth(monthForecast);
    }
}
