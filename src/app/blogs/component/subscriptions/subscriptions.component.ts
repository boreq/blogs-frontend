import {Component, OnInit} from '@angular/core';
import {BlogsBaseComponent} from '../blogs-base/blogs-base.component';
import {BlogService} from '../../service/blog.service';
import {AuthEventsService} from '../../../auth/service/auth-events.service';
import {BlogsService} from '../../service/blogs.service';

@Component({
    selector: 'app-subscriptions',
    templateUrl: './subscriptions.component.html',
    styleUrls: ['./subscriptions.component.scss']
})
export class SubscriptionsComponent extends BlogsBaseComponent implements OnInit {

    constructor(private blogsService: BlogsService,
                blogService: BlogService,
                authEventsService: AuthEventsService) {
        super(blogService, authEventsService);
    }

    protected load(): void {
        this.loading = true;
        this.blogsService.listSubscribed(this.sortingModel, this.page, this.perPage)
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

}
