import { baseUrl } from "./../environments/environment";
import { HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http:HttpClient) { }
  
  login(data:any[]):Observable<any>{
    return this.http.post(`${baseUrl}users/login`,data);
  }
}
