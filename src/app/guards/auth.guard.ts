import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from './../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    route.paramMap.get('idProduct');
    route.paramMap.has('idProduct');
    return this.authService.getUser().pipe(
      map((user) => {
        if (!user) {
          this.router.navigate(['/home']);
          return false;
        }
        return true;
      })
    );
  }
}
