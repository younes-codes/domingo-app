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
    selector: 'app-client',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, ErrorMessageComponent],
    templateUrl: './client.component.html',
    styleUrls: ['./client.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ClientComponent),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => ClientComponent),
            multi: true
        }
    ]
})
export class ClientComponent implements ControlValueAccessor, Validator {
    clientFormGroup: FormGroup = this.fb.group({
        client: [null, Validators.required]
    })

    constructor(private fb: FormBuilder) {
    }

    public onTouched: () => void = () => {
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    registerOnChange(fn: any): void {
        this.clientFormGroup.valueChanges.subscribe(fn);
    }

    setDisabledState(isDisabled: boolean): void {
        isDisabled ? this.clientFormGroup.disable() : this.clientFormGroup.enable()
    }

    writeValue(obj: any): void {
        obj && this.clientFormGroup.setValue(obj, {emitEvent: false});
    }

    validate(control: AbstractControl): ValidationErrors | null {
        return this.clientFormGroup.valid ? null : {
            invalidClient: {
                valid: false,
                message: 'client incorrect'
            }
        };

    }
}
