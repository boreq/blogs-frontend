import {Component, OnInit} from '@angular/core';
import {BlogsService} from '../../service/blogs.service';
import {Blog} from '../../dto/blog';

@Component({
    selector: 'app-blogs',
    templateUrl: './blogs.component.html',
    styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {

    blogs: Blog[];

    constructor(private blogsService: BlogsService) {
    }

    ngOnInit() {
        this.blogsService.list()
            .subscribe(blogsList => {
                this.blogs = blogsList.blogs;
            });
    }

}
