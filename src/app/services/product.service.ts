import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Product } from '../models/product';
import { baseUrl } from "../../environments/environment";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private Products: Product[] = [];

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getList(id:number): Observable<any> {
    return this.http.get(`${baseUrl}users/getList/` + id);
  }

  getProducts(): Observable<any> {
    return this.http.get(`${baseUrl}users/products`);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${baseUrl}users/product/` + id);
  }

  getProduct(id: number): Observable<any> {
    return this.http.get(`${baseUrl}users/product/` + id);
  }

  updateProduct(data: []): Observable<any> {
    return this.http.patch(`${baseUrl}users/product/`, data);
  }

  addProduct(data: []): Observable<any> {
    return this.http.post(`${baseUrl}users/product/`, data);
  }

  addList(userId:number, productId:number): Observable<any>{
    return this.http.post(`${baseUrl}users/addList/`, {'userId':userId, 'productId':productId});
  }

  deleteList(userId:number, productId:number): Observable<any>{
    return this.http.post(`${baseUrl}users/deleteList/`, {'userId':userId, 'productId':productId});
  }
}
