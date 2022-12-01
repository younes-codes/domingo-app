import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {MonthsForecast} from "../models/forecast.model";

@Injectable({providedIn: 'root'})
export class ForecastService {
    forecastStored = JSON.parse(localStorage.getItem('forecast'));
    forecast: BehaviorSubject<MonthsForecast[]> = new BehaviorSubject<MonthsForecast[]>(this.forecastStored);

    getDayForecasted: BehaviorSubject<number> = new BehaviorSubject<number>(null);
}
