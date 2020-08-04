import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { Router } from  '@angular/router';
import { Login } from  '../login';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isSubmitted  =  false;
  isSuccessfullLogin: boolean;

  constructor(private _loginService: LoginService, private router: Router, private formBuilder: FormBuilder ) { }

  ngOnInit(): void {
    this.loginForm  =  this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });
  }

  get formControls() { return this.loginForm.controls; }

  login(){
    this.isSubmitted = true;
    if(this.loginForm.invalid){
      return;
    }
    this.isSuccessfullLogin = this._loginService.login(this.loginForm.value);
    this.router.navigateByUrl('/contact-list');
  }

}
