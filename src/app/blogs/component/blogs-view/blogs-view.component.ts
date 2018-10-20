import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SortingModel} from '../../../base/dto/sorting-model';
import {BlogsList} from '../../dto/blogs-list';
import {Blog} from '../../dto/blog';
import {SortingDefinition} from '../../../base/dto/sorting-definition';

@Component({
    selector: 'app-blogs-view',
    templateUrl: './blogs-view.component.html',
    styleUrls: ['./blogs-view.component.scss']
})
export class BlogsViewComponent {

    @Input()
    perPage: number;

    @Input()
    sortingDefinitions: SortingDefinition[];

    @Input()
    header: string;

    @Input()
    sortingModel: SortingModel;

    @Input()
    page: number;

    @Input()
    loading: boolean;

    @Input()
    blogs: BlogsList;

    @Output()
    sortingModelChange = new EventEmitter<SortingModel>();

    @Output()
    pageChange = new EventEmitter<number>();

    @Output()
    subscribe = new EventEmitter<Blog>();

    @Output()
    unsubscribe = new EventEmitter<Blog>();

    onPageChange(page: number): void {
        this.pageChange.emit(page);
    }

    onSortingModelChange(sortingModel: SortingModel): void {
        this.sortingModelChange.emit(sortingModel);
    }

    onSubscribe(blog: Blog): void {
        this.subscribe.emit(blog);
    }

    onUnsubscribe(blog: Blog): void {
        this.unsubscribe.emit(blog);
    }

}
