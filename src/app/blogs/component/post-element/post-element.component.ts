import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../../../auth/dto/user';
import {AuthEventsService} from '../../../auth/service/auth-events.service';
import {AuthModalService} from '../../../auth/service/auth-modal.service';
import {Post} from '../../dto/post';
import {CleanupSubscriptionsComponent} from '../../../base/component/cleanup-subscriptions/cleanup-subscriptions.component';

@Component({
    selector: 'app-post-element',
    templateUrl: './post-element.component.html',
    styleUrls: ['./post-element.component.scss']
})
export class PostElementComponent extends CleanupSubscriptionsComponent implements OnInit {

    @Input()
    post: Post;

    @Output()
    star = new EventEmitter<Post>();

    @Output()
    unstar = new EventEmitter<Post>();

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

    onStarClick(event: any): void {
        this.star.next(this.post);
    }

    onUnstarClick(event: any): void {
        this.unstar.next(this.post);
    }

    showRegisterPopup(): void {
        this.authModalService.openRegisterModal();
    }
}
