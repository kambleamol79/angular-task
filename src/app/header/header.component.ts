import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggeisLoggedIn: boolean;
  loggedInUserName: string;
  constructor(private _loginService: LoginService) { }

  ngOnInit(): void {
    this._loginService.getIsLoggedIn().subscribe(loginStatus => this.isLoggeisLoggedIn = loginStatus);
    this.loggedInUserName = this._loginService.getLoggedInUserName();
  }

  logout() {
    this._loginService.logout();
  }

}
