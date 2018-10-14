import {Injectable} from '@angular/core';
import {RegisterModalComponent} from '../component/register-modal/register-modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {LoginModalComponent} from '../component/login-modal/login-modal.component';

@Injectable({
    providedIn: 'root'
})
export class AuthModalService {

    constructor(private modalService: NgbModal) {
    }

    openRegisterModal(): void {
        this.modalService.open(RegisterModalComponent);
    }

    openLoginModal(): void {
        this.modalService.open(LoginModalComponent);
    }

}
