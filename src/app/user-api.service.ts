import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAPIService {

  constructor(private http: HttpClient) { }
  
  getData(){
    let getUrl = "https://jsonplaceholder.typicode.com/users";
    return this.http.get(getUrl);
  }

  postData(data: any): Observable<any> {
    const postUrl = "https://jsonplaceholder.typicode.com/posts/1";
    const headers = new HttpHeaders({  'Content-type': 'application/json'});
    return this.http.post<any>(postUrl, data, {headers});
  }

}
