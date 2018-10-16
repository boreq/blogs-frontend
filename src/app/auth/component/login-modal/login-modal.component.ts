import {Component, OnInit} from '@angular/core';
import {FormErrors} from '../../dto/form-errors';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AuthService} from '../../service/auth.service';
import {AuthEventsService} from '../../service/auth-events.service';
import {LoginFormModel} from '../../dto/login-form-model';

@Component({
    selector: 'app-login-modal',
    templateUrl: './login-modal.component.html',
    styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {

    model: LoginFormModel;
    errors: FormErrors;
    working: boolean;

    constructor(private activeModal: NgbActiveModal,
                private authService: AuthService,
                private authEventsService: AuthEventsService) {
    }

    ngOnInit(): void {
        this.model = new LoginFormModel();
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
        this.authService.login(this.model)
            .subscribe(
                userWithToken => {
                    this.working = false;
                    this.authService.setToken(userWithToken.token);
                    this.authEventsService.loggedIn(userWithToken.user);
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
