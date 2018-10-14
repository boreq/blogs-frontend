import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {RegisterFormModel} from '../../dto/register-form-model';
import {AuthService} from '../../service/auth.service';
import {AuthEventsService} from '../../service/auth-events.service';
import {FormErrors} from '../../dto/form-errors';

@Component({
    selector: 'app-register-modal',
    templateUrl: './register-modal.component.html',
    styleUrls: ['./register-modal.component.scss']
})
export class RegisterModalComponent implements OnInit {

    model: RegisterFormModel;
    errors: FormErrors;
    working: boolean;

    constructor(private activeModal: NgbActiveModal,
                private authService: AuthService,
                private authEventsService: AuthEventsService) {
    }

    ngOnInit(): void {
        this.model = new RegisterFormModel();
        this.errors = null;
        this.working = false;
    }

    dismiss(): void {
        this.activeModal.dismiss();
    }

    register(): void {
        if (this.working) {
            return;
        }
        this.working = true;
        this.authService.register(this.model)
            .subscribe(
                userWithToken => {
                    this.working = false;
                    this.authEventsService.loggedIn(userWithToken.user);
                    this.authService.setToken(userWithToken.token);
                    this.close();
                },
                error => {
                    this.working = false;
                    if (error.status === 400) {
                        this.errors = error.error;
                    }
                });
    }

    close(): void {
        this.activeModal.close();
    }

}
