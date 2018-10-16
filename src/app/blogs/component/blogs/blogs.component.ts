import {Component, OnInit} from '@angular/core';
import {BlogsService} from '../../service/blogs.service';
import {SortingDefinition} from '../../../base/dto/sorting-definition';
import {SortingModel} from '../../../base/dto/sorting-model';
import {BlogsList} from '../../dto/blogs-list';
import {Blog} from '../../dto/blog';
import {BlogService} from '../../service/blog.service';

@Component({
    selector: 'app-blogs',
    templateUrl: './blogs.component.html',
    styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {

    readonly perPage = 20;
    readonly sortingDefinitions: SortingDefinition[] = [
        {label: 'Title', key: 'title', reverse: false},
        {label: 'Subscriptions', key: 'subscriptions', reverse: true},
        {label: 'Last post', key: 'lastPost', reverse: true}
    ];

    sortingModel: SortingModel;
    page: number;
    loading: boolean;
    blogsList: BlogsList;

    constructor(private blogsService: BlogsService,
                private blogService: BlogService) {
    }

    ngOnInit() {
        this.sortingModel = {key: this.sortingDefinitions[0].key, reverse: false};
        this.page = 1;
        this.loading = false;
        this.load();
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
