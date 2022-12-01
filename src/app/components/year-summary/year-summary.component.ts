import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Store} from "@ngrx/store";
import {YearSummaryDirective} from "./year-summary.directive";
import {ButtonComponent} from "../button/button.component";
import {MonthsForecast} from "../../models/forecast.model";
import * as fromApp from '../../store/app.reducer';
import {User} from "../../models/user.model";
import {ForecastService} from "../../services/forecast.service";

@Component({
    selector: 'app-year-summary',
    standalone: true,
    imports: [CommonModule, YearSummaryDirective, ButtonComponent],
    templateUrl: './year-summary.component.html',
    styleUrls: ['./year-summary.component.scss']
})
export class YearSummaryComponent implements OnInit {
    forecastedDay: number = 0;
    forecastedCA: number = 0;
    maxAvailableCA: number = 0;

    maxDayAvailable: number = 0;

    user: User;

    constructor(private store: Store<fromApp.AppState>, private forecastService: ForecastService) {
    }

    ngOnInit() {
        const user: User = JSON.parse(localStorage.getItem('user'));
        if (user) {
            this.user = user;
            this.getTotalDayForecasted();
        }
    }

    private getTotalDayForecasted = (): void => {
        const forecastMonthParsed: MonthsForecast[] = JSON.parse(localStorage.getItem('forecast'));
        if (forecastMonthParsed) {
            this.forecastedDay = forecastMonthParsed.reduce((a, b) => a + b.dayForecasted, 0);
            this.forecastService.getDayForecasted.next(this.forecastedDay);
            this.forecastedCA = forecastMonthParsed.reduce((a, b) => a + b.CA, 0);
            this.maxDayAvailable = forecastMonthParsed.reduce((a, b) => a + b.dayWork, 0);
            this.maxAvailableCA = this.maxDayAvailable * this.user.tjm;
            return;
        }
        this.store.select("forecastMonth").subscribe((value: MonthsForecast[]) => {
            this.forecastedDay = value.reduce((a, b) => a + b.dayForecasted, 0);
            this.forecastedCA = value.reduce((a, b) => a + b.CA, 0);
            this.maxDayAvailable = value.reduce((a, b) => a + b.dayWork, 0);
            this.maxAvailableCA = this.maxDayAvailable * this.user.tjm;
        });
    }

}
