import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonComponent} from "../button/button.component";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {Store} from "@ngrx/store";
import * as ForecastMonthActions from "../../store/forecast/forecast.actions";
import {MonthsForecast} from "../../models/forecast.model";
import * as fromApp from '../../store/app.reducer';
import {User} from "../../models/user.model";
import {Subscription} from "rxjs";
import {MonthSummaryComponent} from "../month-summary/month-summary.component";
import {ErrorMessageComponent} from "../error-message/error-message.component";
import {MonthInputComponent} from "./month-input/month-input.component";
import {ForecastService} from "../../services/forecast.service";

@Component({
    selector: 'app-month-form',
    standalone: true,
    imports: [
        CommonModule,
        ButtonComponent,
        ReactiveFormsModule,
        MonthSummaryComponent,
        ErrorMessageComponent,
        MonthInputComponent,
    ],
    templateUrl: './month-form.component.html',
    styleUrls: ['./month-form.component.scss']
})
export class MonthFormComponent implements OnInit, OnDestroy {

    registerForm: FormGroup = this.fb.group({
        dayForecasted: [null],
    });
    @Input() placeholder: string;

    @Input() month: string;

    @Input() index: number;

    @Input() maxDayWorked: number;
    @Input() dayForecasted: number = 0;
    @Input() user: User;

    forecastMonths: MonthsForecast[];

    sub: Subscription;

    constructor(
        private fb: FormBuilder,
        private store: Store<fromApp.AppState>,
        private forecastService: ForecastService
    ) {
    }

    ngOnInit(): void {
        const forecastParsed = this.forecastService.forecast.value;
        if (forecastParsed) {
            this.forecastMonths = forecastParsed;
            this.dayForecasted = this.forecastMonths[this.index].dayForecasted;
        } else {
            this.store.select("forecastMonth").subscribe((v) => {
                this.forecastMonths = v;
            });
        }
    }

    onSubmit() {
        const month = this.month;
        const dayForecasted = this.registerForm.value.dayForecasted.dayForecasted;
        const index = this.index;
        const tjm = this.user.tjm;
        this.store.dispatch(new ForecastMonthActions.ForecastActions({
            dayForecasted,
            month,
            index,
            tjm
        }));

        this.sub = this.store.select("forecastMonth").subscribe((value: MonthsForecast[]) => {
            const copyMonths: MonthsForecast[] = [...this.forecastMonths];
            const updatedMonth: MonthsForecast = value[index];
            copyMonths[index] = updatedMonth;
            this.dayForecasted = updatedMonth.dayForecasted;
            this.forecastMonths = copyMonths;
            localStorage.setItem('forecast', JSON.stringify(copyMonths));
            this.forecastService.forecast.next(JSON.parse(localStorage.getItem('forecast')));
            this.registerForm.controls['dayForecasted'].setValue(null);
        });

        if (this.sub) {
            this.sub.unsubscribe();
        }
    }

    ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }
}
