import {Component, OnInit} from '@angular/core';
import {SortingDefinition} from '../../../base/dto/sorting-definition';
import {SortingModel} from '../../../base/dto/sorting-model';
import {AuthEventsService} from '../../../auth/service/auth-events.service';
import {CleanupSubscriptionsComponent} from '../../../base/component/cleanup-subscriptions/cleanup-subscriptions.component';
import {User} from '../../../auth/dto/user';
import {PostsService} from '../../service/posts.service';
import {PostsList} from '../../dto/posts-list';

@Component({
    selector: 'app-posts',
    templateUrl: './posts.component.html',
    styleUrls: ['./posts.component.scss']
})
export class PostsComponent extends CleanupSubscriptionsComponent implements OnInit {

    readonly perPage = 20;
    readonly sortingDefinitions: SortingDefinition[] = [
        {label: 'Date', key: 'date', reverse: true},
        {label: 'Title', key: 'title', reverse: false},
        {label: 'Stars', key: 'stars', reverse: true}
    ];

    user: User;
    sortingModel: SortingModel;
    page: number;
    loading: boolean;
    postsList: PostsList;

    constructor(private postsService: PostsService,
                private authEventsService: AuthEventsService) {
        super();
    }

    ngOnInit() {
        this.sortingModel = {key: this.sortingDefinitions[0].key, reverse: this.sortingDefinitions[0].reverse};
        this.page = 1;
        this.loading = false;

        this.load();
        this.loadOnChangesInUser();
    }

    private load(): void {
        this.loading = true;
        this.postsService.list(this.sortingModel, this.page, this.perPage)
            .subscribe(
                postsList => {
                    this.loading = false;
                    this.postsList = postsList;
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

}
