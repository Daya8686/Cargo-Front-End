import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private servise: AuthService,
    private router: Router
  ){
     
  }


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let url: string = state.url;
      return this.checkUserLogin(next, url);
      // if(this.servise.isLoggedin()){
      //   return true;
      // }else{
      //   this.router.navigate(['login'])
      //   return false
      // }
  }



  checkUserLogin(route: ActivatedRouteSnapshot, url: any): boolean {
    if (this.servise.isLoggedin()) {
      const userRole = this.servise.getRole();
      if (route.data["role"] && route.data["role"].indexOf(userRole) === -1) {
        this.router.navigate(['/']);
        return false;
      }
      return true;
    }

    this.router.navigate(['login']);
    return false;
  }
  
}
