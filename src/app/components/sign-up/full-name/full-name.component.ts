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
    selector: 'app-full-name',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, ErrorMessageComponent],
    templateUrl: './full-name.component.html',
    styleUrls: ['./full-name.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => FullNameComponent),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => FullNameComponent),
            multi: true
        }
    ]
})
export class FullNameComponent implements ControlValueAccessor, Validator {
    fullNameFormGroup: FormGroup = this.fb.group({
        firstname: [null, Validators.required],
        lastname: [null, Validators.required]
    })

    constructor(private fb: FormBuilder) {
    }

    public onTouched: () => void = () => {
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    registerOnChange(fn: any): void {
        this.fullNameFormGroup.valueChanges.subscribe(fn);
    }

    setDisabledState(isDisabled: boolean): void {
        isDisabled ? this.fullNameFormGroup.disable() : this.fullNameFormGroup.enable()
    }

    writeValue(obj: any): void {
        obj && this.fullNameFormGroup.setValue(obj, {emitEvent: false});
    }

    validate(control: AbstractControl): ValidationErrors | null {
        return this.fullNameFormGroup.valid ? null : {
            invalidFullName: {
                valid: false,
                message: 'nom ou prénom incorrect'
            }
        };

    }
}
