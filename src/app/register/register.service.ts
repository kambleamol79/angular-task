import { Injectable } from '@angular/core';
import { Register } from '../register';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  userList:any[] = [];

  constructor() {
    let userList = JSON.parse(localStorage.getItem('userList'));
    if(userList){
      this.userList = userList;
    }
  }

  register(userInfo: Register){
    this.userList.push(userInfo);
    localStorage.setItem('userList', JSON.stringify(this.userList));
  }
}
