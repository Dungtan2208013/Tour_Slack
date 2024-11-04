import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cart } from '../common/Cart';

@Injectable({
  providedIn: 'root'
})
export class booksService {

  url = "http://localhost:8080/api/books";

  urlBookDetail = "http://localhost:8080/api/BookDetails";

  constructor(private httpClient: HttpClient) { }

  post(email: string, cart: Cart) {
    return this.httpClient.post(this.url+'/'+email, cart);
  }

  get(email:string) {
    return this.httpClient.get(this.url+'/user/'+email);
  }

  getById(id:number) {
    return this.httpClient.get(this.url+'/'+id);
  }

  getByBooks(id:number) {
    return this.httpClient.get(this.urlBookDetail+'/books/'+id);
  }

  cancel(id: number) {
    return this.httpClient.get(this.url+'/cancel/'+id);
  }
}
