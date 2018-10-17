import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {RegisterFormModel} from '../dto/register-form-model';
import {HttpClient} from '@angular/common/http';
import {UserWithToken} from '../dto/user-with-token';
import {CookieService} from 'ngx-cookie-service';
import {User} from '../dto/user';
import {LoginFormModel} from '../dto/login-form-model';
import {Observable, of} from 'rxjs';

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

    login(loginFormModel: LoginFormModel): Observable<UserWithToken> {
        const url = environment.api + 'auth/login';
        return this.http.post<UserWithToken>(url, loginFormModel);
    }

    logout(): Observable<void> {
        const url = environment.api + 'auth/logout';
        return this.http.post<void>(url, null);
    }

    checkLogin(): Observable<User> {
        const token = this.getToken();
        if (token) {
            const url = environment.api + 'auth/check-login';
            return this.http.get<User>(url);
        } else {
            return of(null);
        }
    }

    setToken(token: string): void {
        this.cookieService.set(this.sessionCookieName, token);
    }

    getToken(): string {
        return this.cookieService.get(this.sessionCookieName);
    }

    clearToken(): void {
        this.cookieService.delete(this.sessionCookieName);
    }

}
