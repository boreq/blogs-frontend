import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PostService {

    constructor(private http: HttpClient) {
    }

    star(postId: number): Observable<void> {
        const url = environment.api + `post/${postId}/star`;
        return this.http.post<void>(url, null);
    }

    unstar(postId: number): Observable<void> {
        const url = environment.api + `post/${postId}/unstar`;
        return this.http.post<void>(url, null);
    }

}
