import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {RegisterFormModel} from '../dto/register-form-model';
import {HttpClient} from '@angular/common/http';
import {UserWithToken} from '../dto/user-with-token';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private readonly sessionCookieName = 'session_key';

    constructor(private http: HttpClient,
                private cookieService: CookieService) {
    }

    register(registerFormModel: RegisterFormModel): Observable<UserWithToken> {
        const url = environment.api + 'auth/register';
        return this.http.post<UserWithToken>(url, registerFormModel);
    }

    setToken(token: string): void {
        this.cookieService.set(this.sessionCookieName, token);
    }

    getToken(): string {
        return this.cookieService.get(this.sessionCookieName);
    }

}
