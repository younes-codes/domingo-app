import {Action} from "@ngrx/store";

export const FORECAST_MONTH = 'FORECAST_MONTH';

export class ForecastActions implements Action {
    readonly type = FORECAST_MONTH;

    constructor(public payload: { dayForecasted: number, month: string, index: number, tjm: number }) {
    }
}
