import {Component} from '@angular/core';
import {LoginService} from "./login/service/login.service";
import {AuthService} from "./core/auth/service/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  sidenavOpened = false;

  constructor(public authService: AuthService,
              public loginService: LoginService) {
  }

}
