import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root', //name of app component which will load all pages its a entry point
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent implements DoCheck {
  title = 'CargoTeam';
  islogin:Boolean = false;
  menuType:string = '';
  userName:string = ''; //We are defining a variable name
  constructor(
    private router: Router,
    private service: AuthService,
  ) {


    this.islogin = this.service.isLoggedin()
  }

  ngDoCheck(): void { //ngDoCheck is a method of Angular like OnInIt it will 
    //check the right hand side values are changing or not it will update the values 
    this.islogin = this.service.isLoggedin()
    this.userName = this.service.getUsername()
    this.menuType = this.service.getRole().toLowerCase()
  }

  


  handleLogout(){
    localStorage.clear() //before logout this functionality is called which will clear the browser local storage
    this.router.navigate(['login']) //login page this page is displayed after logout
  }
}
