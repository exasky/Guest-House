import {Component, HostBinding} from '@angular/core';
import {LoginService} from '../service/login.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  @HostBinding('class') cssClass = 'd-flex flex-grow';

  loginForm: FormGroup;

  loginError: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private loginService: LoginService,
              private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      nickname: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }


  login() {
    this.loginService.login(this.loginForm.get('nickname').value, this.loginForm.get('password').value)
      .subscribe(res => {
        this.loginService.processJwtToken(res.token);
        let redirect = this.route.snapshot.params['redirect'];
        if (!redirect) {
          redirect = '/';
        }
        this.router.navigate([redirect]);
      }, error => {
        this.loginError = error.error;
      });
  }
}
