import { Component, OnInit } from '@angular/core';
import {PostsService} from '../../service/posts.service';
import {PostService} from '../../service/post.service';
import {AuthEventsService} from '../../../auth/service/auth-events.service';
import {PostsBaseComponent} from '../posts-base/posts-base.component';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.scss']
})
export class StarsComponent extends PostsBaseComponent implements OnInit {

    constructor(private postsService: PostsService,
                postService: PostService,
                authEventsService: AuthEventsService) {
        super(postService, authEventsService);
    }

    protected load(): void {
        this.loading = true;
        this.postsService.listStarred(this.sortingModel, this.page, this.perPage)
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
