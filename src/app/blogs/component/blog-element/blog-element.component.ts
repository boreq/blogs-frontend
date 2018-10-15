import {Component, Input} from '@angular/core';
import {Blog} from '../../dto/blog';

@Component({
    selector: 'app-blog-element',
    templateUrl: './blog-element.component.html',
    styleUrls: ['./blog-element.component.scss']
})
export class BlogElementComponent {

    @Input()
    blog: Blog;

}
