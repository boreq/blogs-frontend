import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Blog} from '../dto/blog';
import {Category} from '../dto/category';
import {Tag} from '../dto/tag';
import {Post} from '../dto/post';

@Injectable({
    providedIn: 'root'
})
export class BlogService {

    constructor(private http: HttpClient) {
    }

    subscribe(blogId: number): Observable<void> {
        const url = environment.api + `blog/${blogId}/subscribe`;
        return this.http.post<void>(url, null);
    }

    unsubscribe(blogId: number): Observable<void> {
        const url = environment.api + `blog/${blogId}/unsubscribe`;
        return this.http.post<void>(url, null);
    }

    get(blogId: number): Observable<Blog> {
        const url = environment.api + `blog/${blogId}`;
        return this.http.get<Blog>(url);
    }

    getCategories(blogId: number): Observable<Category[]> {
        const url = environment.api + `blog/${blogId}/categories`;
        return this.http.get<Category[]>(url);
    }

    getTags(blogId: number): Observable<Tag[]> {
        const url = environment.api + `blog/${blogId}/tags`;
        return this.http.get<Tag[]>(url);
    }

    getPosts(blogId: number): Observable<Post[]> {
        const url = environment.api + `blog/${blogId}/posts`;
        return this.http.get<Post[]>(url);
    }

}
