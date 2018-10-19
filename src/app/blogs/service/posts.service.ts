import {Injectable} from '@angular/core';
import {SortingModel} from '../../base/dto/sorting-model';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {PostsList} from '../dto/posts-list';

@Injectable({
    providedIn: 'root'
})
export class PostsService {

    constructor(private http: HttpClient) {
    }

    listStarred(sortingModel: SortingModel, page: number, perPage: number): Observable<PostsList> {
        const url = environment.api + 'posts/list/starred';
        return this.listPosts(url, perPage, page, sortingModel);
    }

    listFromSubscriptions(sortingModel: SortingModel, page: number, perPage: number): Observable<PostsList> {
        const url = environment.api + 'posts/list/subscriptions';
        return this.listPosts(url, perPage, page, sortingModel);
    }

    list(sortingModel: SortingModel, page: number, perPage: number): Observable<PostsList> {
        const url = environment.api + 'posts/list';
        return this.listPosts(url, perPage, page, sortingModel);
    }

    private listPosts(url: string, perPage: number, page: number, sortingModel: SortingModel): Observable<PostsList> {
        let params = new HttpParams();
        params = params.set('perPage', perPage.toString());
        params = params.set('page', page.toString());
        params = params.set('sort', sortingModel.key);
        params = params.set('reverse', sortingModel.reverse ? 'true' : 'false');
        return this.http.get<PostsList>(url, {params: params});
    }
}
