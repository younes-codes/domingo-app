import {MonthsForecast} from "../models/forecast.model";
import {ActionReducerMap} from "@ngrx/store";
import {User} from "../models/user.model";
import {userReducer} from "./user/user.reducer";
import {forecastReducer} from "./forecast/forecast.reducer";

export interface AppState {
    user: User,
    forecastMonth: MonthsForecast[]
}

export const appReducer: ActionReducerMap<AppState> = {
    user: userReducer,
    forecastMonth: forecastReducer
}
