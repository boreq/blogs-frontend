import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {BlogsList} from '../dto/blogs-list';

@Injectable({
    providedIn: 'root'
})
export class BlogsService {

    constructor(private http: HttpClient) {
    }

    list(): Observable<BlogsList> {
        const url = environment.api + 'blogs/list';
        return this.http.get<BlogsList>(url);
    }
}
