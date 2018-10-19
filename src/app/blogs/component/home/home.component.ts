import {Component, OnInit} from '@angular/core';
import {AuthEventsService} from '../../../auth/service/auth-events.service';
import {PostsBaseComponent} from '../posts-base/posts-base.component';
import {PostService} from '../../service/post.service';
import {PostsService} from '../../service/posts.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent extends PostsBaseComponent implements OnInit {

    constructor(private postsService: PostsService,
                authEventsService: AuthEventsService,
                postService: PostService) {
        super(postService, authEventsService);
    }

    ngOnInit() {
        super.ngOnInit();
    }

    protected load(): void {
        this.loading = true;
        this.postsService.listFromSubscriptions(this.sortingModel, this.page, this.perPage)
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
