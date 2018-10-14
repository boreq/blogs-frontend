import {Component, Input} from '@angular/core';
import {FormErrors} from '../../dto/form-errors';

@Component({
    selector: 'app-form-errors',
    templateUrl: './form-errors.component.html',
    styleUrls: ['./form-errors.component.scss']
})
export class FormErrorsComponent {

    @Input()
    formErrors: FormErrors;

}
