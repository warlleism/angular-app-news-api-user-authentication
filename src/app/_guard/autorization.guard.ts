import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationGuard implements CanActivate {
  constructor(private router: Router) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> {
    if (await this.isUserAuthenticated()) {
      return true;
    } else {
      return this.router.createUrlTree(['/login']);
    }
  }

  private isUserAuthenticated(): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const autorization = localStorage.getItem('login');
        if (autorization) {
          resolve(true);
        } else {
          resolve(false);
        }
      }, 2000);
    });
  }
}
