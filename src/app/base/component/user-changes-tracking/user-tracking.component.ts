import {OnInit} from '@angular/core';
import {CleanupSubscriptionsComponent} from '../cleanup-subscriptions/cleanup-subscriptions.component';
import {AuthEventsService} from '../../../auth/service/auth-events.service';
import {User} from '../../../auth/dto/user';

export abstract class UserTrackingComponent extends CleanupSubscriptionsComponent implements OnInit {

    constructor(protected authEventsService: AuthEventsService) {
        super();
    }

    ngOnInit() {
        this.trackUserChanges();
    }

    private trackUserChanges() {
        this.registerSubscription(
            this.authEventsService.loggedIn$
                .subscribe(user => {
                    if (user !== undefined) {
                        this.userLoaded(user);
                    }
                })
        );
    }

    protected abstract userLoaded(user: User): void;

}
