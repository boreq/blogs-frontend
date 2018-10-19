import {OnInit} from '@angular/core';
import {SortingDefinition} from '../../../base/dto/sorting-definition';
import {User} from '../../../auth/dto/user';
import {SortingModel} from '../../../base/dto/sorting-model';
import {PostsList} from '../../dto/posts-list';
import {PostService} from '../../service/post.service';
import {AuthEventsService} from '../../../auth/service/auth-events.service';
import {Post} from '../../dto/post';
import {UserTrackingComponent} from '../../../base/component/user-changes-tracking/user-tracking.component';

export abstract class PostsBaseComponent extends UserTrackingComponent implements OnInit {

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

    constructor(protected postService: PostService,
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

    star(post: Post): void {
        this.postService.star(post.id)
            .subscribe(() => {
                this.updateStarredValue(post, true);
            });
    }

    unstar(post: Post): void {
        this.postService.unstar(post.id)
            .subscribe(() => {
                this.updateStarredValue(post, false);
            });
    }

    private updateStarredValue(post: Post, starred: boolean): void {
        const foundPost = this.postsList.posts.find(b => b.id === post.id);
        if (foundPost) {
            foundPost.starred = starred;
        }
    }
}
