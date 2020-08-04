import { Injectable } from '@angular/core';
import { Login } from '../login';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from  '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  isLoggedIn: BehaviorSubject<boolean>;

  constructor(private router: Router) {
    this.isLoggedIn = <BehaviorSubject<boolean>>new BehaviorSubject(false);
  }

  getIsLoggedIn(): Observable<boolean>{
    return this.isLoggedIn.asObservable();
    //return localStorage.getItem('ACCESS_TOKEN') !== null;
  }

  getLoggedInUserName(): string{
    return localStorage.getItem('ACCESS_TOKEN');
  }

  public login(userInfo: Login){
    let usersList = JSON.parse(localStorage.getItem('userList'));
    if (usersList.some((item) => item.email == userInfo.username && usersList.some((item) => item.password == userInfo.password))) {       
        localStorage.setItem('ACCESS_TOKEN', userInfo.username);
        this.isLoggedIn.next(true);
        return true;
    }else{
      this.isLoggedIn.next(false);
      return false;
    }
    
  }

  public logout(){
    localStorage.removeItem('ACCESS_TOKEN');
    this.isLoggedIn.next(false);
    this.router.navigateByUrl('/login');
  }

}
