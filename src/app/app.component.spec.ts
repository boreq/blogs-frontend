import {async, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from './app.component';
import {Component, Input} from '@angular/core';
import {AuthService} from './auth/service/auth.service';
import {AuthEventsService} from './auth/service/auth-events.service';

@Component({
    selector: 'app-user-menu',
    template: ''
})
class UserMenuStubComponent {

    @Input()
    loading: boolean;
}


describe('AppComponent', () => {
    let authServiceSpy: jasmine.SpyObj<AuthService>;
    let authEventsServiceSpy: jasmine.SpyObj<AuthEventsService>;

    beforeEach(async(() => {
        const authService = jasmine.createSpyObj('AuthService', ['checkLogin']);
        const authEventsService = jasmine.createSpyObj('AuthEventsService', ['login']);

        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule
            ],
            declarations: [
                AppComponent,
                UserMenuStubComponent
            ],
            providers: [
                {provide: AuthService, useValue: authService},
                {provide: AuthEventsService, useValue: authEventsService}
            ]
        }).compileComponents();

        authServiceSpy = TestBed.get(AuthService);
        authEventsServiceSpy = TestBed.get(AuthEventsService);
    }));

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });

    it(`should have as title 'Blogs'`, () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        console.log(app);
        expect(app.title).toEqual('Blogs');
    });

    it('should render title in the nav bar', () => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('.navbar-brand').textContent).toContain('Blogs');
    });
});
