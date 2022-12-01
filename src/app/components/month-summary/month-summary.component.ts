import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {User} from "../../models/user.model";

@Component({
    selector: 'app-month-summary',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './month-summary.component.html',
    styleUrls: ['./month-summary.component.scss']
})
export class MonthSummaryComponent {
    @Input() dayForecasted: number;
    @Input() month: string;
    @Input() user: User;

}
