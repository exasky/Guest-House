import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient,
              private authService: AuthService,
              private router: Router) {
  }

  login(username: string, password: string) {
    return this.http.post<{ token: string }>(environment.serverUrl + '/login', {username, password});
  }

  processJwtToken(token: string) {
    localStorage.setItem('JWT', token);
    this.authService.setCurrentUser(jwt_decode(token));
  }

  logout() {
    localStorage.removeItem('JWT');
    this.authService.setCurrentUser(null);
    this.router.navigate(['/login']);
  }
}
