interface FieldErrors {
    [s: string]: string[];
}

export class FormErrors {
    errors: string[];
    fieldErrors: FieldErrors;
}
