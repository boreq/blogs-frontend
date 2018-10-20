import {OnInit} from '@angular/core';
import {SortingDefinition} from '../../../base/dto/sorting-definition';
import {User} from '../../../auth/dto/user';
import {SortingModel} from '../../../base/dto/sorting-model';
import {BlogsList} from '../../dto/blogs-list';
import {BlogService} from '../../service/blog.service';
import {AuthEventsService} from '../../../auth/service/auth-events.service';
import {Blog} from '../../dto/blog';
import {UserTrackingComponent} from '../../../base/component/user-changes-tracking/user-tracking.component';

export abstract class BlogsBaseComponent extends UserTrackingComponent implements OnInit {

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

    constructor(private blogService: BlogService,
                authEventsService: AuthEventsService) {
        super(authEventsService);
    }

    ngOnInit() {
        this.sortingModel = {key: this.sortingDefinitions[0].key, reverse: this.sortingDefinitions[0].reverse};
        this.page = 1;
        this.loading = false;
        super.ngOnInit();
    }

    protected userLoaded(user: User): void {
        this.user = user;
        this.load();
    }

    protected abstract load(): void;

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
