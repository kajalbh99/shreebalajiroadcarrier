import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Injectable()
export class AuthGuard implements CanActivate {
  user;
  constructor(private router: Router,location: Location) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  Promise<boolean> | boolean {
      this.user = window.localStorage.getItem('logged_user');
      if(this.user!=null){
        // Blocking access to sign-in and signup when user already Signed in
        /*if( this.router.url =='/login' || this.router.url == '/'){
          //alert('You are already Logged in.');
          this.router.navigateByUrl('/main');
        }else{
          return true;
        }*/
        return true;

      }else{
        this.router.navigateByUrl('/login');
      }
  }
}
