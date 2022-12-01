import * as ForecastActions from "./forecast.actions";
import {MonthsForecast} from "../../models/forecast.model";
import {initialState} from "./forecast.state";

const updateMonthForecast = (state: MonthsForecast[], dayForecasted: number, monthParam: string, i: number, tjm: number) => {
    const copyState = [...state];
    const monthToUpdate = copyState.find((obj) => obj.month === monthParam);
    copyState[i] = {...monthToUpdate, dayForecasted, CA: dayForecasted * tjm};
    return copyState;
}

export function forecastReducer(state = initialState, action: ForecastActions.ForecastActions) {
    switch (action.type) {
        case ForecastActions.FORECAST_MONTH:
            return updateMonthForecast(state, action.payload.dayForecasted, action.payload.month, action.payload.index, action.payload.tjm);
        default:
            return initialState;
    }
}
