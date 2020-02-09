import {CanActivate, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {Location} from '@angular/common';

@Injectable()
export class IsAuthGuard implements CanActivate {

  constructor(private router: Router,
              private location: Location) {
  }

  canActivate() {
    if (!!localStorage.getItem('JWT')) {
      return true;
    } else {
      this.router.navigate(['/login'], {queryParams: {redirect: this.location.path()}});
      return false;
    }
  }
}
