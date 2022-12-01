import {Component, forwardRef} from '@angular/core';
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
    Validators
} from "@angular/forms";
import {ErrorMessageComponent} from "../../error-message/error-message.component";

@Component({
    selector: 'app-email',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, ErrorMessageComponent],
    templateUrl: './email.component.html',
    styleUrls: ['./email.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => EmailComponent),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => EmailComponent),
            multi: true
        }
    ]
})
export class EmailComponent implements ControlValueAccessor, Validator {
    emailFormGroup: FormGroup = this.fb.group({
        email: [null, [Validators.email, Validators.required]]
    })
    isTouched: boolean;

    constructor(private fb: FormBuilder) {
    }

    public onTouched: () => void = () => {
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    registerOnChange(fn: any): void {
        this.emailFormGroup.valueChanges.subscribe(fn);
    }

    setDisabledState(isDisabled: boolean): void {
        isDisabled ? this.emailFormGroup.disable() : this.emailFormGroup.enable()
    }

    writeValue(obj: any): void {
        obj && this.emailFormGroup.setValue(obj, {emitEvent: false});
    }

    validate(control: AbstractControl): ValidationErrors | null {
        return this.emailFormGroup.valid ? null : {
            invalidEmail: {
                valid: false,
                message: 'email incorrect'
            }
        };
    }

    onBlur() {
        const value = this.emailFormGroup.value.email;
        if (value) {
            this.emailFormGroup.controls['email'].setValue(value.trim());
        }
    }

}
