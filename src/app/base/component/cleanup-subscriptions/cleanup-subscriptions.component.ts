import {OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';

export class CleanupSubscriptionsComponent implements OnDestroy {

    subscriptions: Subscription[] = [];

    registerSubscription(subscription: Subscription): void {
        this.subscriptions.push(subscription);
    }

    ngOnDestroy(): void {
        while (this.subscriptions.length > 0) {
            this.subscriptions.pop().unsubscribe();
        }
    }

}
