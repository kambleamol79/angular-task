import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  reqType: string;
  selectedPost: any;

  constructor(private httpClient: HttpClient) { }

  getContacts(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(this.apiUrl)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  setRequestType(Type){
    this.reqType = Type;
  }

  getRequestType(){
    return this.reqType;
  }

  setPost(post){
    this.selectedPost = post;
  }

  getPost():{userId, id, title, body}{
    return this.selectedPost;
  }

  createContact(contact: {userId, id, title, body}) {
    return this.httpClient.post(this.apiUrl, JSON.stringify(contact), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  } 
  
  updateContact(contact: {userId, id, title, body}, podtId) {
    return this.httpClient.put(this.apiUrl+'/'+ podtId, JSON.stringify(contact), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }  

  delete(id){
    return this.httpClient.delete<Post>(this.apiUrl + '/' + id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  errorHandler(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
 }



}

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}