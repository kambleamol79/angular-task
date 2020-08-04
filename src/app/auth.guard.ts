import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login/login.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _loginService: LoginService, private router: Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let loggedInStatus;
      this._loginService.getIsLoggedIn().subscribe(loginStatus => loggedInStatus = loginStatus);
      if(loggedInStatus){
        return loggedInStatus
      }else{
        this.router.navigateByUrl('/login');
      }
  }
  
}
