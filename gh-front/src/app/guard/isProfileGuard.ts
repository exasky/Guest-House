import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Injectable} from '@angular/core';
import {PlayerService} from '../services/player.service';
import {Observable} from 'rxjs';

@Injectable()
export class IsProfileGuard implements CanActivate {

  constructor(private router: Router,
              private playerService: PlayerService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const rolesToCheck = route.data.roles as string[];
    if (rolesToCheck.indexOf(this.playerService.currentPlayer.type) !== -1) {
      return true;
    } else {
      return this.router.navigate(['/'], {queryParams: {message: 'unauthorized'}});
    }
  }
}
