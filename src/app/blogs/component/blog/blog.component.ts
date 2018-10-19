import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CleanupSubscriptionsComponent} from '../../../base/component/cleanup-subscriptions/cleanup-subscriptions.component';
import {BlogService} from '../../service/blog.service';
import {Blog} from '../../dto/blog';
import {User} from '../../../auth/dto/user';
import {AuthEventsService} from '../../../auth/service/auth-events.service';
import {AuthModalService} from '../../../auth/service/auth-modal.service';
import {Category} from '../../dto/category';
import {Tag} from '../../dto/tag';
import {Post} from '../../dto/post';

@Component({
    selector: 'app-blog',
    templateUrl: './blog.component.html',
    styleUrls: ['./blog.component.scss']
})
export class BlogComponent extends CleanupSubscriptionsComponent implements OnInit {

    id: number;
    blog: Blog;
    categories: Category[];
    tags: Tag[];
    posts: Post[];
    user: User;

    constructor(private route: ActivatedRoute,
                private authEventsService: AuthEventsService,
                private authModalService: AuthModalService,
                private blogService: BlogService) {
        super();
    }


    ngOnInit() {
        this.registerSubscription(
            this.route.params.subscribe(params => {
                this.id = +params['id'];
                this.load();
                this.loadOnChangesInUser();
            })
        );
    }

    private loadOnChangesInUser(): void {
        this.registerSubscription(
            this.authEventsService.loggedIn$
                .subscribe(user => {
                    if (this.user !== undefined) {
                        this.user = user;
                        this.load();
                    } else {
                        this.user = user;
                    }
                })
        );
    }

    private load(): void {
        this.blogService.get(this.id)
            .subscribe(blog => {
                this.blog = blog;
            });

        this.blogService.getCategories(this.id)
            .subscribe(categories => {
                this.categories = categories;
            });

        this.blogService.getTags(this.id)
            .subscribe(tags => {
                this.tags = tags;
            });

        this.blogService.getPosts(this.id)
            .subscribe(posts => {
                this.posts = posts;
            });
    }

    showRegisterPopup(): void {
        this.authModalService.openRegisterModal();
    }

    subscribe(): void {
        this.blogService.subscribe(this.blog.id)
            .subscribe(() => {
                this.blog.subscribed = true;
            });
    }

    unsubscribe(): void {
        this.blogService.unsubscribe(this.blog.id)
            .subscribe(() => {
                this.blog.subscribed = false;
            });
    }

}
