import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterLink} from "@angular/router";
import {MonthsForecast} from "../../models/forecast.model";
import {User} from "../../models/user.model";

@Component({
    selector: 'app-month-link',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './month-link.component.html',
    styleUrls: ['./month-link.component.scss']
})
export class MonthLinkComponent {
    @Input() forecast: MonthsForecast;
    @Input() user: User;
}
