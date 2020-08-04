import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  isLoggeisLoggedIn: boolean;
  constructor(private _loginService: LoginService) { }

  ngOnInit(): void {
    this._loginService.getIsLoggedIn().subscribe(loginStatus => this.isLoggeisLoggedIn = loginStatus);
  }

}
