import {Component, OnInit} from '@angular/core';
import {User} from './auth/dto/user';
import {AuthEventsService} from './auth/service/auth-events.service';
import {AuthModalService} from './auth/service/auth-modal.service';
import {CleanupSubscriptionsComponent} from './base/component/cleanup-subscriptions/cleanup-subscriptions.component';
import {AuthService} from './auth/service/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent extends CleanupSubscriptionsComponent implements OnInit {
    appTitle = 'Blogs';
    user: User;

    constructor(private authModalService: AuthModalService,
                private authEventsService: AuthEventsService,
                private authService: AuthService) {
        super();

    }

    ngOnInit(): void {
        this.registerSubscription(
            this.authEventsService.loggedIn$
                .subscribe(user => {
                    this.user = user;
                })
        );

        this.authService.checkLogin()
            .subscribe(user => {
                this.authEventsService.loggedIn(user);
            });
    }

    register(): void {
        this.authModalService.openRegisterModal();
    }

    login(): void {
    }

}
