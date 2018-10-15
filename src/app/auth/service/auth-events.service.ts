import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {User} from '../dto/user';

@Injectable({
    providedIn: 'root'
})
export class AuthEventsService {

    loggedIn$ = new BehaviorSubject<User>(null);

    loggedIn(user: User): void {
        this.loggedIn$.next(user);
    }

}
