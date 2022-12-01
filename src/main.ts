import {bootstrapApplication} from "@angular/platform-browser";
import {AppComponent} from "./app/app.component";
import {StoreModule} from "@ngrx/store";
import {importProvidersFrom} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {HomePageComponent} from "./app/pages/home-page/home-page.component";
import {ProfilePageComponent} from "./app/pages/profile-page/profile-page.component";
import {SignUpPageComponent} from "./app/pages/sign-up-page/sign-up-page.component";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import * as fromApp from './app/store/app.reducer';
import {AuthGuard} from "./app/guards/auth.guard";
import {
    MonthInputPageComponent
} from "./app/pages/month-input-page/month-input-page.component";

const routes: Routes = [
    {path: '', component: HomePageComponent, canActivate: [AuthGuard]},
    {path: 'mois/:month', component: MonthInputPageComponent, canActivate: [AuthGuard]},
    {path: 'mon-profil', component: ProfilePageComponent, canActivate: [AuthGuard]},
    {path: 'inscription', component: SignUpPageComponent},
];

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(
            StoreModule.forRoot(fromApp.appReducer),
            RouterModule.forRoot(routes),
            StoreDevtoolsModule.instrument({})
        )

    ]
});
