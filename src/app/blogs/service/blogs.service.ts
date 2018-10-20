import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {BlogsList} from '../dto/blogs-list';
import {SortingModel} from '../../base/dto/sorting-model';

@Injectable({
    providedIn: 'root'
})
export class BlogsService {

    constructor(private http: HttpClient) {
    }

    listSubscribed(sortingModel: SortingModel, page: number, perPage: number): Observable<BlogsList> {
        const url = environment.api + 'blogs/list/subscribed';
        return this.listBlogs(url, perPage, page, sortingModel);
    }

    list(sortingModel: SortingModel, page: number, perPage: number): Observable<BlogsList> {
        const url = environment.api + 'blogs/list';
        return this.listBlogs(url, perPage, page, sortingModel);
    }

    private listBlogs(url: string, perPage: number, page: number, sortingModel: SortingModel): Observable<BlogsList> {
        let params = new HttpParams();
        params = params.set('perPage', perPage.toString());
        params = params.set('page', page.toString());
        params = params.set('sort', sortingModel.key);
        params = params.set('reverse', sortingModel.reverse ? 'true' : 'false');
        return this.http.get<BlogsList>(url, {params: params});
    }
}
