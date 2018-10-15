import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

    @Input()
    page: number;

    @Input()
    allItems: number;

    @Input()
    perPage: number;

    @Output()
    pageChange = new EventEmitter<number>();

    constructor() {
    }

    ngOnInit() {
    }

    onPageChange(page: number): void {
        this.pageChange.emit(page);
    }

}
