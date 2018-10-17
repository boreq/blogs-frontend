import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Blog} from '../../dto/blog';
import {CleanupSubscriptionsComponent} from '../../../base/component/cleanup-subscriptions/cleanup-subscriptions.component';
import {AuthEventsService} from '../../../auth/service/auth-events.service';
import {User} from '../../../auth/dto/user';
import {AuthModalService} from '../../../auth/service/auth-modal.service';

@Component({
    selector: 'app-blog-element',
    templateUrl: './blog-element.component.html',
    styleUrls: ['./blog-element.component.scss']
})
export class BlogElementComponent extends CleanupSubscriptionsComponent implements OnInit {

    @Input()
    blog: Blog;

    @Output()
    subscribe = new EventEmitter<Blog>();

    @Output()
    unsubscribe = new EventEmitter<Blog>();

    user: User;

    constructor(private authEventsService: AuthEventsService,
                private authModalService: AuthModalService) {
        super();
    }


    ngOnInit(): void {
        this.registerSubscription(
            this.authEventsService.loggedIn$
                .subscribe(user => {
                    this.user = user;
                })
        );
    }

    onSubscribeClick(event: any): void {
        this.subscribe.next(this.blog);
    }

    onUnsubscribeClick(event: any): void {
        this.unsubscribe.next(this.blog);
    }

    showRegisterPopup(): void {
        this.authModalService.openRegisterModal();
    }

}
