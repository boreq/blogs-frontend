import {Component, OnInit} from '@angular/core';
import {BlogsService} from '../../service/blogs.service';
import {SortingDefinition} from '../../../base/dto/sorting-definition';
import {SortingModel} from '../../../base/dto/sorting-model';
import {BlogsList} from '../../dto/blogs-list';
import {Blog} from '../../dto/blog';
import {BlogService} from '../../service/blog.service';
import {AuthEventsService} from '../../../auth/service/auth-events.service';
import {CleanupSubscriptionsComponent} from '../../../base/component/cleanup-subscriptions/cleanup-subscriptions.component';
import {User} from '../../../auth/dto/user';

@Component({
    selector: 'app-blogs',
    templateUrl: './blogs.component.html',
    styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent extends CleanupSubscriptionsComponent implements OnInit {

    readonly perPage = 20;
    readonly sortingDefinitions: SortingDefinition[] = [
        {label: 'Title', key: 'title', reverse: false},
        {label: 'Subscriptions', key: 'subscriptions', reverse: true},
        {label: 'Last post', key: 'lastPost', reverse: true}
    ];

    user: User;
    sortingModel: SortingModel;
    page: number;
    loading: boolean;
    blogsList: BlogsList;

    constructor(private blogsService: BlogsService,
                private blogService: BlogService,
                private authEventsService: AuthEventsService) {
        super();
    }

    ngOnInit() {
        this.sortingModel = {key: this.sortingDefinitions[0].key, reverse: false};
        this.page = 1;
        this.loading = false;

        this.load();
        this.loadOnChangesInUser();
    }

    private load() {
        this.loading = true;
        this.blogsService.list(this.sortingModel, this.page, this.perPage)
            .subscribe(
                blogsList => {
                    this.loading = false;
                    this.blogsList = blogsList;
                },
                () => {
                    this.loading = false;
                }
            );
    }

    private loadOnChangesInUser() {
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

    onPageChange(page: number): void {
        if (!this.loading) {
            this.page = page;
            this.load();
        }
    }

    onSortingModelChange(sortingModel: SortingModel): void {
        if (!this.loading) {
            this.sortingModel = sortingModel;
            this.load();
        }
    }

    subscribe(blog: Blog): void {
        this.blogService.subscribe(blog.id)
            .subscribe(() => {
                this.updateSubscribedValue(blog, true);
            });
    }

    unsubscribe(blog: Blog): void {
        this.blogService.unsubscribe(blog.id)
            .subscribe(() => {
                this.updateSubscribedValue(blog, false);
            });
    }

    private updateSubscribedValue(blog: Blog, subscribed: boolean): void {
        const foundBlog = this.blogsList.blogs.find(b => b.id === blog.id);
        if (foundBlog) {
            foundBlog.subscribed = subscribed;
        }
    }

}
