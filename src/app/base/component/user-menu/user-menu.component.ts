import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../auth/dto/user';
import {CleanupSubscriptionsComponent} from '../cleanup-subscriptions/cleanup-subscriptions.component';
import {AuthModalService} from '../../../auth/service/auth-modal.service';
import {AuthEventsService} from '../../../auth/service/auth-events.service';
import {AuthService} from '../../../auth/service/auth.service';

@Component({
    selector: 'app-user-menu',
    templateUrl: './user-menu.component.html',
    styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent extends CleanupSubscriptionsComponent implements OnInit {

    @Input()
    loading: boolean;

    user: User;

    constructor(private authModalService: AuthModalService,
                private authEventsService: AuthEventsService,
                private authService: AuthService) {
        super();
    }

    ngOnInit() {
        this.registerSubscription(
            this.authEventsService.loggedIn$
                .subscribe(user => {
                    this.user = user;
                })
        );
    }

    register(): void {
        this.authModalService.openRegisterModal();
    }

    login(): void {
        this.authModalService.openLoginModal();
    }

    logout(): void {
        this.authService.logout()
            .subscribe(value => {
                this.authService.clearToken();
                this.authEventsService.loggedIn(null);
            });
    }
}
