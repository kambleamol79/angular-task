import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-contact-create',
  templateUrl: './contact-create.component.html',
  styleUrls: ['./contact-create.component.css']
})
export class ContactCreateComponent implements OnInit {

  contact : {userId, id, title, body} = {userId: 1, id: null, title: "", body: ""};
  reqType: string;
  selectedPost: any;

  constructor(public dataService: DataService) { }

  ngOnInit() {
    this.reqType = this.dataService.getRequestType();
    if(this.reqType == 'view' || this.reqType == 'update'){
      this.selectedPost = this.dataService.getPost();
      this.contact.userId = this.selectedPost.userId;
      this.contact.id = this.selectedPost.id;
      this.contact.title = this.selectedPost.title;
      this.contact.body = this.selectedPost.body;
    }
  }

  createContact(){
    this.dataService.createContact(this.contact).subscribe(res => {
    });
    this.contact = {userId: 1, id: null, title: "", body: ""};
  }

  updateContact(){
    this.dataService.updateContact(this.contact, this.contact.id).subscribe(res => {
    });
    this.contact = {userId: 1, id: null, title: "", body: ""};
  }
}