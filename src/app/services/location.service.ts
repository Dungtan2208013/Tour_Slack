import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  url = "http://localhost:8080/api/location";
  
  constructor(private httpClient: HttpClient) { }
  
  getAll() {
    return this.httpClient.get(this.url);
  }

//   getAllBestSeller() {
//     return this.httpClient.get(this.url+'/bestseller');
//   }

//   getOne(id: number) {
//     return this.httpClient.get(this.url + '/' + id);
//   }
}
