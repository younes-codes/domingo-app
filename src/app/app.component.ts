import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CommonModule} from "@angular/common";
import {MonthFormComponent} from "./components/month-form/month-form.component";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {YearSummaryComponent} from "./components/year-summary/year-summary.component";
import {HomePageComponent} from "./pages/home-page/home-page.component";
import {RouterModule, RouterOutlet} from "@angular/router";
import {MonthsForecast} from "./models/forecast.model";
import * as fromApp from './store/app.reducer';

@Component({
    standalone: true,
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [CommonModule, MonthFormComponent, YearSummaryComponent, HomePageComponent, RouterOutlet, RouterModule],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class AppComponent {
    forecastMonth: Observable<MonthsForecast[]> = this.store.select("forecastMonth");

    constructor(private store: Store<fromApp.AppState>) {
    }
}
