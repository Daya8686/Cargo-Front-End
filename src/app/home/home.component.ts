import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements DoCheck {
  customer_name:string = "Customer"
  userType:string = '';
  userName:string='';
  constructor(
    private router: Router,
    private service: AuthService
  ) {
  }

  ngDoCheck(): void {
    
    this.userType = this.service.getRole()
    this.userName = this.service.getUsername()
  }
}
