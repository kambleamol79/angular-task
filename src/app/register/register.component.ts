import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { Router } from  '@angular/router';
import { RegisterService } from './register.service';
// import custom validator to validate that password and confirm password fields match
import { MustMatch } from './must-match.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  isSubmitted  =  false;
  terms_conditions_not_checked: boolean = false;
  constructor(private _registerService: RegisterService, private router: Router, private formBuilder: FormBuilder ) { }

  ngOnInit(): void {
    this.registerForm  =  this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(8)]],
      confirm_password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(8)]],
      terms_conditions: [false, Validators.requiredTrue],
    }, {
      validator: MustMatch('password', 'confirm_password')
  });
  }

  get formControls() { return this.registerForm.controls; }

  register(){

    this.isSubmitted = true;

    if(this.registerForm.invalid){
      return;
    }
    
    this._registerService.register(this.registerForm.value);
    this.registerForm.reset();
    this.router.navigateByUrl('/login');
  }



}
