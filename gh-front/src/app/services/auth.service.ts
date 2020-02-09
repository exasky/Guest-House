import {Injectable} from "@angular/core";
import {UserModel} from "../model/user.model";
import {Observable, Subject, PartialObserver, Subscription} from "rxjs";
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: UserModel;

  private userSubject: Subject<UserModel>;
  private userObservable: Observable<UserModel>;

  constructor() {
    this.userSubject = new Subject<UserModel>();
    this.userObservable = this.userSubject.asObservable();

    const jwtToken = localStorage.getItem('JWT');
    if (jwtToken) {
      this.setCurrentUser(jwt_decode(jwtToken));
    }
  }

  setCurrentUser(user: UserModel){
    this.user = user;
    this.userSubject.next(this.user);
  }

  onUserChange(observer?: PartialObserver<UserModel>): Subscription {
    return this.userObservable.subscribe(observer);
  }
}
