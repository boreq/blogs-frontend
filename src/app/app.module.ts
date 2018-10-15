import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgbModalModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RegisterModalComponent} from './auth/component/register-modal/register-modal.component';
import {AuthModalService} from './auth/service/auth-modal.service';
import {FormsModule} from '@angular/forms';
import {SpinnerButtonComponent} from './auth/component/spinner-button/spinner-button.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormErrorsComponent} from './auth/component/form-errors/form-errors.component';
import {InputFieldComponent} from './auth/component/input-field/input-field.component';
import {AuthEventsService} from './auth/service/auth-events.service';
import {AuthService} from './auth/service/auth.service';
import {CookieService} from 'ngx-cookie-service';
import {AuthorizationInterceptor} from './auth/http-interceptors/authorization-interceptor';
import {LoginModalComponent} from './auth/component/login-modal/login-modal.component';
import {SpinnerComponent} from './base/component/spinner/spinner.component';
import {UserMenuComponent} from './base/component/user-menu/user-menu.component';
import { BlogsComponent } from './blogs/component/blogs/blogs.component';

@NgModule({
    declarations: [
        AppComponent,
        RegisterModalComponent,
        SpinnerButtonComponent,
        FormErrorsComponent,
        InputFieldComponent,
        LoginModalComponent,
        SpinnerComponent,
        UserMenuComponent,
        BlogsComponent
    ],
    imports: [
        NgbModule,
        NgbModalModule,
        FormsModule,
        BrowserModule,
        AppRoutingModule,
        HttpClientModule
    ],
    providers: [
        AuthModalService,
        AuthEventsService,
        AuthService,
        CookieService,
        {provide: HTTP_INTERCEPTORS, useClass: AuthorizationInterceptor, multi: true}
    ],
    entryComponents: [
        RegisterModalComponent,
        LoginModalComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
