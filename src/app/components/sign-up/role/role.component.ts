import {Component, forwardRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
    ControlValueAccessor,
    FormBuilder,
    FormGroup,
    NG_VALUE_ACCESSOR,
    ReactiveFormsModule,
    Validators
} from "@angular/forms";
import {ErrorMessageComponent} from "../../error-message/error-message.component";

@Component({
    selector: 'app-role',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, ErrorMessageComponent],
    templateUrl: './role.component.html',
    styleUrls: ['./role.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => RoleComponent),
            multi: true
        }
    ]
})
export class RoleComponent implements ControlValueAccessor {
    roleFormGroup: FormGroup = this.fb.group({
        role: [null, Validators.required]
    })

    constructor(private fb: FormBuilder) {
    }

    public onTouched: () => void = () => {
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    registerOnChange(fn: any): void {
        this.roleFormGroup.valueChanges.subscribe(fn);
    }

    setDisabledState(isDisabled: boolean): void {
        isDisabled ? this.roleFormGroup.disable() : this.roleFormGroup.enable()
    }

    writeValue(obj: any): void {
        obj && this.roleFormGroup.setValue(obj, {emitEvent: false});
    }

}
