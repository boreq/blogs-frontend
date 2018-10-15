import {Component, OnInit} from '@angular/core';
import {CleanupSubscriptionsComponent} from './base/component/cleanup-subscriptions/cleanup-subscriptions.component';
import {throwError} from 'rxjs';
import {AuthEventsService} from './auth/service/auth-events.service';
import {AuthService} from './auth/service/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent extends CleanupSubscriptionsComponent implements OnInit {
    appTitle = 'Blogs';
    loading = false;

    constructor(private authEventsService: AuthEventsService,
                private authService: AuthService) {
        super();
    }

    ngOnInit() {
        this.loading = true;
        this.authService.checkLogin()
            .subscribe(user => {
                    this.loading = false;
                    this.authEventsService.loggedIn(user);
                },
                error => {
                    this.loading = false;
                    throwError(error);
                });
    }
}
