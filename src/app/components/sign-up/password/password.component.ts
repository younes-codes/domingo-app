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
    selector: 'app-password',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, ErrorMessageComponent],
    templateUrl: './password.component.html',
    styleUrls: ['./password.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => PasswordComponent),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => PasswordComponent),
            multi: true
        }
    ]
})
export class PasswordComponent implements ControlValueAccessor, Validator {

    passwordValidation: Validators[] = [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$.!%*?&])[A-Za-z\d$@$!%*?&].{8,}')];
    passwordFormGroup: FormGroup = this.fb.group({
        password: [null, this.passwordValidation],
        confirmPassword: [null, this.passwordValidation],
    })

    constructor(private fb: FormBuilder) {
    }

    public onTouched: () => void = () => {
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    registerOnChange(fn: any): void {
        this.passwordFormGroup.valueChanges.subscribe(fn);
    }

    setDisabledState(isDisabled: boolean): void {
        isDisabled ? this.passwordFormGroup.disable() : this.passwordFormGroup.enable()
    }

    writeValue(obj: any): void {
        obj && this.passwordFormGroup.setValue(obj, {emitEvent: false});
    }

    validate(control: AbstractControl): ValidationErrors | null {
        return this.passwordFormGroup.valid ? null : {
            invalidPassword: {
                valid: false,
                message: 'mot de passe incorrect'
            }
        };

    }
}
