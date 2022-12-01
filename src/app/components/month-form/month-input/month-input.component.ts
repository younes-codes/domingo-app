import {
    Component,
    forwardRef,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
    AbstractControl,
    ControlValueAccessor,
    FormBuilder,
    FormGroup,
    NG_VALIDATORS,
    NG_VALUE_ACCESSOR,
    ReactiveFormsModule,
    ValidationErrors,
    Validator,
    ValidatorFn,
    Validators
} from "@angular/forms";
import {ErrorMessageComponent} from "../../error-message/error-message.component";
import {
    MonthInputErrorMessageComponent
} from "../month-input-error-message/month-input-error-message.component";

@Component({
    selector: 'app-month-input',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, ErrorMessageComponent, MonthInputErrorMessageComponent],
    templateUrl: './month-input.component.html',
    styleUrls: ['./month-input.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => MonthInputComponent),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => MonthInputComponent),
            multi: true
        }
    ]
})
export class MonthInputComponent implements OnInit, ControlValueAccessor, Validator, OnChanges {
    @Input() maxDayWorked: number;
    @Input() placeholder: string;
    @Input() month: string;
    monthInputForm: FormGroup = this.fb.group({
        dayForecasted: [null]
    });

    constructor(private fb: FormBuilder) {
    }

    public onTouched: () => void = () => {
    }

    dayForecastedValidators: () => ValidatorFn[] = () => [Validators.max(this.maxDayWorked), Validators.required, Validators.min(0)];

    ngOnInit() {
        this.monthInputForm.controls['dayForecasted'].setValidators(this.dayForecastedValidators());
    }

    writeValue(obj: any): void {
        obj && this.monthInputForm.setValue(obj);
        if (obj === null) {
            this.monthInputForm.reset();
        }
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    registerOnChange(fn: any): void {
        this.monthInputForm.valueChanges.subscribe(fn);
    }

    setDisabledState(isDisabled: boolean): void {
        isDisabled ? this.monthInputForm.disable() : this.monthInputForm.enable()
    }

    validate(control: AbstractControl): ValidationErrors | null {
        return this.monthInputForm.valid ? null : {
            email: {
                valid: false,
                message: 'email incorrect'
            }
        };
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.monthInputForm.controls['dayForecasted'].setValidators(this.dayForecastedValidators());
        this.resetDayForecastedInput();
    }

    private resetDayForecastedInput = (): void => {
        this.monthInputForm.controls['dayForecasted'].markAsUntouched();
        this.monthInputForm.controls['dayForecasted'].markAsPristine();
        this.monthInputForm.controls['dayForecasted'].setValue(null);
        this.monthInputForm.controls['dayForecasted'].setErrors({invalid: true});
    }
}
