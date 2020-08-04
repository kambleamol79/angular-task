import { Component, OnInit } from '@angular/core';
import { DataService, Post } from '../data.service';
import { Router } from  '@angular/router';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  contacts: Post[] = [];
  filteredContacts: Post[] = [];
  selectedContact;

  constructor(public _dataService: DataService, private router: Router) { }

  ngOnInit() {
    this.getAllPosts();
    this.search('');  
  }

  getAllPosts(){
    this._dataService.getContacts().subscribe((res: Post[]) => {
      this.contacts = res;
      this.filteredContacts = res;
    });
  }

  // To search post
  public search(searchValue: string){
    // if input is empty it will return entire list or will return filtered list
    if(searchValue != ''){
      this.filteredContacts = this.contacts.filter(item => item.title.toLowerCase().indexOf(searchValue.toLowerCase()) > -1);
      return;
    }
    this.filteredContacts = this.contacts;
    
  }

  // To set selected post
  public viewContact(contact){
    this._dataService.setPost(contact);
    this._dataService.setRequestType('view');
    this.router.navigateByUrl('/contact-create');
  }

  // To set to update post
  public editContact(contact){
    this._dataService.setPost(contact);
    this._dataService.setRequestType('update');
    this.router.navigateByUrl('/contact-create');
  }

  // To set delete post
  public deleteContact(contact){
    this._dataService.delete(contact.id).subscribe(res => {
      this.getAllPosts();
    });
    
  }


}