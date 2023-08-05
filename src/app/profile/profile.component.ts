import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

type profileInterface = {
  customerId: any;
  customerName: string;
  customerEmail: string;
  customerPhone: any;
  customerAddress: string;
  customerZip: string;
  cityId: any;
}


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  submitted = false;
  errorMsg = "";
  cities: any = [];
  allCustomersList: any = [];
  customerEmail: string = "";
  thisCustomerId:any = '';
  constructor(
    private builder: FormBuilder,
    private service: AuthService,
    private router: Router
  ) {
    this.customerEmail = this.service.getUserEmail();
    this.getCustomers();

    this.getCities()
    this.getUserDetails()
  }

  getCustomers() {
    this.service.getCustomers().then((res) => {
      this.allCustomersList = res;
      this.setUserId()
    }).catch((err) => {
      this.errorMsg = err.message
    })
  }

  setUserId() {
    let ID = sessionStorage.getItem('customerId')
    if(ID){
      this.thisCustomerId = ID;
      return;
    }
    let thisCustomer = this.allCustomersList.find((cus: any) => {
      console.log("aa",cus, this.customerEmail)
      return cus.customerEmail.toLowerCase() == this.customerEmail.toLowerCase()
    })

    if(thisCustomer){
      sessionStorage.setItem('customerId', thisCustomer.customerId)
      this.thisCustomerId = thisCustomer.customerId;
    }else{
      this.thisCustomerId = '';
    }


  }


  profileForm = this.builder.group({
    customerId: this.builder.control(0),
    customerName: this.builder.control('', Validators.required),
    customerEmail: this.builder.control('', Validators.compose([Validators.required, Validators.email])),
    customerPhone: this.builder.control('', Validators.required),
    customerAddress: this.builder.control('', Validators.required),
    customerZip: this.builder.control('', Validators.required),
    cityId: this.builder.control('', Validators.required),

  })


  getUserDetails() {

    // let userId = this.service.getUserId() || null;
    let userId = Number(sessionStorage.getItem('customerId')) || null;
    if(!userId ){ this.setUserId(); return }

      this.service.getuserDetails(userId).then((res: any) => {
        this.errorMsg = '';

        if (res) {
          this.profileForm.setValue({
            customerId: userId,
          customerName: res.customerName,
          customerEmail: res.customerEmail,
          customerPhone: res.customerPhone,
          customerAddress: res.customerAddress,
          customerZip: res.customerZip,
          cityId: res.cityId,
        })
        
      }
    }).catch((err) => {
      this.errorMsg = err.message
    })
  }


  getCities() {
    this.service.getCities().then((res) => {
      this.cities = res;
    }).catch((err) => {
    })
  }





  get a() {
    return this.profileForm.controls;
  }



  updateProfile() {
    console.log(this.profileForm.controls)
    this.submitted = true;
    if (this.profileForm.invalid) {
      return;
    }
    let payload = this.profileForm.value
    // let id = this.profileForm.value.customerId
    let id = this.thisCustomerId;

    if(!id || id==0 || id.length==0){
      
      payload.customerId = 0;
      this.service.addCustomer(payload).then((res) => {
        this.errorMsg = '';
        this.submitted = false;
      }).catch((err) => {
        this.errorMsg = err.message
      })

    }else{
      this.service.updateUser(id, payload).then((res) => {
        this.errorMsg = '';
        this.submitted = false;
      }).catch((err) => {
        this.errorMsg = err.message
      })
    }
   




  }


} 