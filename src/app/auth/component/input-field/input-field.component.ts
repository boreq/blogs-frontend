import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormErrors} from '../../dto/form-errors';

@Component({
    selector: 'app-input-field',
    templateUrl: './input-field.component.html',
    styleUrls: ['./input-field.component.scss']
})
export class InputFieldComponent {

    @Input()
    label: string;

    @Input()
    name: string;

    @Input()
    type: string;

    @Input()
    model: string;

    @Input()
    set formErrors(formErrors: FormErrors) {
        this.errors = this.getErrors(formErrors, this.name);
        this.invalid = this.fieldInvalid(formErrors, this.name);
    }

    @Output()
    modelChange = new EventEmitter<string>();

    invalid: boolean;
    errors: string[];

    onNgModelChange(value: string): void {
        this.modelChange.emit(value);
    }

    private fieldInvalid(formErrors: FormErrors, name: string) {
        return this.getErrors(formErrors, name).length > 0;
    }

    private getErrors(formErrors: FormErrors, name: string): string[] {
        if (formErrors &&
            formErrors.field_errors &&
            formErrors.field_errors[name]) {
            return formErrors.field_errors[name];
        }
        return [];
    }

}
