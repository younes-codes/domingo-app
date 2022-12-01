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
    selector: 'app-tjm',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, ErrorMessageComponent],
    templateUrl: './tjm.component.html',
    styleUrls: ['./tjm.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TjmComponent),
            multi: true
        }
    ]
})
export class TjmComponent implements ControlValueAccessor {
    tjmFormGroup: FormGroup = this.fb.group({
        tjm: [null, Validators.required]
    })

    constructor(private fb: FormBuilder) {
    }

    public onTouched: () => void = () => {
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    registerOnChange(fn: any): void {
        this.tjmFormGroup.valueChanges.subscribe(fn);
    }

    setDisabledState(isDisabled: boolean): void {
        isDisabled ? this.tjmFormGroup.disable() : this.tjmFormGroup.enable()
    }

    writeValue(obj: any): void {
        obj && this.tjmFormGroup.setValue(obj, {emitEvent: false});
    }

}
