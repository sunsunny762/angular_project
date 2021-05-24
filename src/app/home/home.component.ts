import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  list: any = {};
  userId: any;

  constructor(
    private localStorageServce: LocalStorageService,
    private productService: ProductService,
    private route: Router
  ) {
    this.userId = this.localStorageServce.retrieve('result').data.id;
  }

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.productService.getList(this.userId).subscribe(data => {
      if (data.success) {
        this.list = data.data;
      }
    }, error => {
      console.log("error", error);
    });
  }

  logout() {
    this.localStorageServce.clear('result');
    this.route.navigate(['login']);
  }

  deleteList(id: number) {
    this.productService.deleteList(this.userId, id).subscribe(data => {
      if (data.success) {
        this.getList();
      }
    }, error => {
      console.log("error", error);
    });
  }

}
