import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Store} from "@ngrx/store";
import {Subject} from "rxjs";
import {RouterLink} from "@angular/router";
import {YearSummaryComponent} from "../../components/year-summary/year-summary.component";
import {MonthsForecast} from "../../models/forecast.model";
import * as fromApp from '../../store/app.reducer';
import {User} from "../../models/user.model";
import {MonthLinkComponent} from "../../components/month-link/month-link.component";
import {ForecastService} from "../../services/forecast.service";

@Component({
    selector: 'app-home-page',
    standalone: true,
    imports: [CommonModule, RouterLink, YearSummaryComponent, MonthLinkComponent],
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

    user: User;
    forecastMonths: Subject<MonthsForecast[]>;

    monthsData: MonthsForecast[];

    constructor(private store: Store<fromApp.AppState>, private forecastService: ForecastService) {
    }

    ngOnInit() {
        const user: User = JSON.parse(localStorage.getItem('user'));
        if (user) {
            this.user = user;
        }
        const forecastMonthParsed: MonthsForecast[] = this.forecastService.forecast.value;
        if (forecastMonthParsed) {
            this.monthsData = forecastMonthParsed;
        } else {
            this.store.select("forecastMonth").subscribe((value: MonthsForecast[]) => {
                this.monthsData = value;
            })
        }
    }

}
