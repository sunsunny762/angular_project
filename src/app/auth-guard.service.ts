import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private localStorageSerice:LocalStorageService,
    private route:Router
    ) { }

  canActivate():boolean{
    if (this.localStorageSerice.retrieve('result').data.id) {
      return true;
    }
    this.route.navigate(['login']);
    return false;
  }
}
