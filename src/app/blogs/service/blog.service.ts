import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

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

}
