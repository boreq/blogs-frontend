import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Blog} from '../../dto/blog';

@Component({
    selector: 'app-blog-element',
    templateUrl: './blog-element.component.html',
    styleUrls: ['./blog-element.component.scss']
})
export class BlogElementComponent {

    @Input()
    blog: Blog;

    cleanUrl: string;

    @Output()
    subscribe = new EventEmitter<Blog>();

    @Output()
    unsubscribe = new EventEmitter<Blog>();

    onSubscribeClick(event: any): void {
        this.subscribe.next(this.blog);
    }

    onUnsubscribeClick(event: any): void {
        this.unsubscribe.next(this.blog);
    }

}
