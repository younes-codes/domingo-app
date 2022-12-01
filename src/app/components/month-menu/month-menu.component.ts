import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterLink} from "@angular/router";

@Component({
    selector: 'app-month-menu',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './month-menu.component.html',
    styleUrls: ['./month-menu.component.scss']
})
export class MonthMenuComponent {
    @Input() nextMonth: string;
    @Input() previousMonth: string;

}
