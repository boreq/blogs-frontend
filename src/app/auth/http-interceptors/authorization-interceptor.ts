import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {AuthService} from '../service/auth.service';
import {catchError} from 'rxjs/operators';
import {AuthEventsService} from '../service/auth-events.service';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService,
                private authEventsService: AuthEventsService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.authService.getToken();
        if (token) {
            const authReq = req.clone({
                headers: req.headers.set('Authorization', token)
            });
            return next.handle(authReq);
        }
        return next.handle(req)
            .pipe(
                catchError(err => {
                    if (err.status === 401) {
                        this.authService.clearToken();
                        this.authEventsService.loggedIn(null);
                    }
                    return throwError(err);
                })
            );
    }

}
