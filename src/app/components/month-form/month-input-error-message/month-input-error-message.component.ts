import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ErrorMessageComponent} from "../../error-message/error-message.component";
import {FormGroup} from "@angular/forms";

@Component({
    selector: 'app-month-input-error-message',
    standalone: true,
    imports: [CommonModule, ErrorMessageComponent],
    templateUrl: './month-input-error-message.component.html',
    styleUrls: ['./month-input-error-message.component.scss']
})
export class MonthInputErrorMessageComponent {

    @Input() form: FormGroup;

    @Input() month: string;

    @Input() maxDayWorked: number;
    message: string;

    isMonthInputFormError = (): boolean => this.form.controls['dayForecasted'].dirty
        && this.form.controls['dayForecasted'].hasError('required') ||
        this.form.controls['dayForecasted'].hasError('min') ||
        this.form.controls['dayForecasted'].hasError('max');
    getErrorMessage = () => `Pour <strong>${this.month}</strong> les jours doivent être compris entre <strong>0</strong> et <strong>${this.maxDayWorked}</strong>`
}
