interface FieldErrors {
    [s: string]: string[];
}

export class FormErrors {
    errors: string[];
    field_errors: FieldErrors;
}
