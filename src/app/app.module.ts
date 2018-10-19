import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgbDropdownModule, NgbModalModule, NgbPaginationModule, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
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
import {BlogsComponent} from './blogs/component/blogs/blogs.component';
import {BlogElementComponent} from './blogs/component/blog-element/blog-element.component';
import {SortingComponent} from './base/component/sorting/sorting.component';
import {PaginationComponent} from './base/component/pagination/pagination.component';
import {MomentModule} from 'ngx-moment';
import {TimeComponent} from './base/component/time/time.component';
import {PostsComponent} from './blogs/component/posts/posts.component';
import {PostElementComponent} from './blogs/component/post-element/post-element.component';
import {PostsViewComponent} from './blogs/component/posts-view/posts-view.component';
import {HomeComponent} from './blogs/component/home/home.component';
import {BlogComponent} from './blogs/component/blog/blog.component';
import {StarsComponent} from './blogs/component/stars/stars.component';

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
        BlogsComponent,
        BlogElementComponent,
        SortingComponent,
        PaginationComponent,
        TimeComponent,
        PostsComponent,
        PostElementComponent,
        BlogComponent,
        PostsViewComponent,
        HomeComponent,
        StarsComponent
    ],
    imports: [
        NgbPaginationModule,
        NgbModalModule,
        NgbTooltipModule,
        NgbDropdownModule,
        FormsModule,
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        MomentModule
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
