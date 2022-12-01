import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Store} from "@ngrx/store";
import {User} from "../../models/user.model";
import * as fromApp from '../../store/app.reducer';
import {ChartComponent} from "../../components/chart/chart.component";

@Component({
    selector: 'app-profile-page',
    standalone: true,
    imports: [CommonModule, ChartComponent],
    templateUrl: './profile-page.component.html',
    styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
    user: User;

    constructor(private store: Store<fromApp.AppState>) {
    }

    ngOnInit() {
        const user: User = JSON.parse(localStorage.getItem('user'));
        if (user) {
            this.user = user;
        }
    }
}
