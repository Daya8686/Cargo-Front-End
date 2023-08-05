import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-request',
  templateUrl: './register-request.component.html',
  styleUrls: ['./register-request.component.css']
})
export class RegisterRequestComponent {

  users :any = [];
  OriginalUsers :any = [];
  errorMsg:string = '';

  constructor(
    private service: AuthService,
    private router: Router
  ) {
    this.getCustomers()

  }



  
  getCustomers() {
    this.service.getCustomers().then((res) => {
        this.users = res
        this.OriginalUsers = res
    }).catch((err) => {
      this.errorMsg = "Unknown Error Occured"
    })
  }

  filterSearch(e: any) {
    const term = e.value;
    let ORGLIST = this.OriginalUsers;

    const result = ORGLIST.filter((item: any) => {
      return (item.customerName.toLowerCase().match(term.toLowerCase()) ||
        item.customerPhone.toLowerCase().match(term.toLowerCase()) 
        // || item.customerId.match(term.toLowerCase())
      )
    })
    this.users = result
  }


}
