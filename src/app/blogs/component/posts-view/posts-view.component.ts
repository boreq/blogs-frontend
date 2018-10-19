import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SortingDefinition} from '../../../base/dto/sorting-definition';
import {SortingModel} from '../../../base/dto/sorting-model';
import {PostsList} from '../../dto/posts-list';
import {Post} from '../../dto/post';

@Component({
    selector: 'app-posts-view',
    templateUrl: './posts-view.component.html',
    styleUrls: ['./posts-view.component.scss']
})
export class PostsViewComponent {

    @Input()
    perPage: number;

    @Input()
    sortingDefinitions: SortingDefinition[];

    @Input()
    header: string;

    @Output()
    sortingModelChange = new EventEmitter<SortingModel>();

    @Input()
    sortingModel: SortingModel;

    @Input()
    page: number;

    @Output()
    pageChange = new EventEmitter<number>();

    @Input()
    loading: boolean;

    @Input()
    posts: PostsList;

    @Output()
    star = new EventEmitter<Post>();

    @Output()
    unstar = new EventEmitter<Post>();

    onSortingModelChange(sortingModel: SortingModel): void {
        this.sortingModelChange.emit(sortingModel);
    }

    onPageChange(page: number): void {
        this.pageChange.emit(page);
    }

    onStarClick(post: Post): void {
        this.star.next(post);
    }

    onUnstarClick(post: Post): void {
        this.unstar.next(post);
    }

}
