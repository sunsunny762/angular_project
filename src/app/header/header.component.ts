import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  name: any;

  constructor(private localStorageService: LocalStorageService, private route: Router) {
    if (this.localStorageService.retrieve('result') && this.localStorageService.retrieve('result').data.firstName) {
      this.name = this.localStorageService.retrieve('result').data.firstName + " " + this.localStorageService.retrieve('result').data.lastName;
    }
  }

  ngOnInit(): void {
  }

  logout() {
    this.localStorageService.clear('result');
    this.route.navigate(['login']);
  }

}
