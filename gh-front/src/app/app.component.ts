import {Component, OnInit} from '@angular/core';
import {LoginService} from "./services/login.service";
import {AuthService} from "./services/auth.service";
import {LightService} from "./services/light.service";
import {LightModel} from "./model/light/light";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'gh-front';

  sidenavOpened = false;

  lights: LightModel[];

  constructor(public authService: AuthService,
              public loginService: LoginService,
              public lightService: LightService) {
  }

  ngOnInit(): void {
    this.lightService.getAll().subscribe(lights => {
      this.lights = lights;
    })
  }
}
