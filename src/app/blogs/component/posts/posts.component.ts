import {Component, OnInit} from '@angular/core';
import {AuthEventsService} from '../../../auth/service/auth-events.service';
import {PostsService} from '../../service/posts.service';
import {PostService} from '../../service/post.service';
import {PostsBaseComponent} from '../posts-base/posts-base.component';

@Component({
    selector: 'app-posts',
    templateUrl: './posts.component.html',
    styleUrls: ['./posts.component.scss']
})
export class PostsComponent extends PostsBaseComponent implements OnInit {

    constructor(private postsService: PostsService,
                postService: PostService,
                authEventsService: AuthEventsService) {
        super(postService, authEventsService);
    }

    protected load(): void {
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

}
