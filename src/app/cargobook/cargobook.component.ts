import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cargobook',
  templateUrl: './cargobook.component.html',
  styleUrls: ['./cargobook.component.css']
})
export class CargobookComponent {
  submitted = false;
  errorMsg = '';
  msg = '';
  finalPrice: any = 0;
  amount: any = 0;
  gst = 18;
  cities: any = [];
  cargoCategory: any = [];
  selectedCargoAmount: Number = 0;
  selectedCargoPrice: Number = 0;
  allCustomersList: any = [];
  customerEmail: string = "";
  customerName: string = "";
  customerPhone: string = "";
  role:string='';

  thisCustomer: any = {
    customerId: '',
    customerName: 'asfsd',
    customerEmail: '',
    customerPhone: '',
    customerAddress: '',
    customerZip: '',
    cityId: '',
    registerId: '',
  };

  constructor(
    private builder: FormBuilder,
    private service: AuthService,
    private router: Router
  ) {
    this.getCities()
    this.getCargos()
    this.getCustomers()
    this.customerEmail = this.service.getUserEmail() || '';
    this.role = this.service.getRole().toLowerCase() || '';
    if(!this.role.match('customer')){
      this.customerEmail = '';
    }
    console.log(this.role)
  }
  

  get a() {
    return this.bookingForm.controls;
  }
  
  
  getCustomers() {
    this.service.getCustomers().then((res) => {
      this.allCustomersList = res;
      
      //  filter one custome if role is CustomerUser  else show all customers
      // let customer = {};
      if(this.role.match('customer')){

        // customer = res.find((cus: any) => {
        //   console.log("aa",cus, this.customerEmail)
        //   return cus.customerEmail.toLowerCase() == this.customerEmail.toLowerCase()
        // })
        this.setCustomer(this.customerEmail)
      }
    }).catch((err) => {
      this.errorMsg = err.message
    })
  }

  selectCustomer(e: any) {
    console.log(e.currentTarget.options[e.currentTarget.options.selectedIndex].id)
    this.setCustomer(e.currentTarget.options[e.currentTarget.options.selectedIndex].id)
  }


  setCustomer(cus_email:any){


    this.thisCustomer = this.allCustomersList.find((cus: any) => {
      console.log("aa",cus, this.customerEmail)
      return cus.customerEmail.toLowerCase() == cus_email.toLowerCase()
    })


    // this.thisCustomer = cus;

    this.customerName  = this.thisCustomer.customerName;
    this.customerPhone  = this.thisCustomer.customerPhone;
    this.customerEmail  = this.thisCustomer.customerEmail;

    // this.bookingForm.setValue()
    this.bookingForm.controls['cargoorderId'].setValue(this.thisCustomer.customerId)
    console.log(this.customerEmail , this.thisCustomer.customerName)
  }

  getCargos() {
    this.service.getCargos().then((res) => {
      this.cargoCategory = res
    }).catch((err) => {
      this.errorMsg = err.message
    })
  }

  getCities() {
    this.service.getCities().then((res) => {
      this.cities = res
    }).catch((err) => {
      this.errorMsg = err.message
    })
  }



  bookingForm = this.builder.group({
    cargoorderDetailsId: 0,
    cargoorderDate: this.builder.control('', Validators.required),
    amount: this.builder.control(0, Validators.required),
    quantity: this.builder.control('', Validators.required),
    status: this.builder.control('pending', Validators.required),
    toCity: this.builder.control('', Validators.required),
    fromCity: this.builder.control('', Validators.required),
    cargoorderId: this.builder.control(this.thisCustomer.customerId , Validators.required),
    // extra ,,, should be removed before sending to API
    weight: this.builder.control('', Validators.required),
    cargoCatId: this.builder.control('', Validators.required),  // this id will be removed before sending to api
  })


  calculateFare() {
    let Data = this.bookingForm.value;
    console.log(Number(Data.quantity) * Number(Data.weight), Number(this.selectedCargoPrice), 's')
    this.amount = Number(Data.quantity) * Number(Data.weight) * Number(this.selectedCargoPrice);
    this.finalPrice = (this.amount * 1.18).toFixed()
  }

  selectCargoPrice(e: any) {
    // console.log(e.currentTarget.options[e.currentTarget.options.selectedIndex].id)
    this.selectedCargoPrice = e.currentTarget.options[e.currentTarget.options.selectedIndex].id
  }
  selectCargoCat(e: any) { this.selectedCargoAmount = e.target.value || 0; }

  handleBook() {
    this.submitted = true;
    console.log(this.bookingForm)
    if (this.bookingForm.invalid) {
      return;
    }
    this.calculateFare()

    let data = this.bookingForm.value;

    data.amount = this.amount;
    // delete data.weight;
    delete data.cargoCatId;
    // data.cargoorderId = this.service.getUserId()
    data.cargoorderId = this.thisCustomer.customerId;
    // cargoOrderId will have customer Id,, due to not possible to handle at backend


    let payload = data;

    console.log(payload)

    this.service.cargoBook(payload).then(() => {

      this.errorMsg = '';
      this.submitted = false;
      alert('Cargo booked successfully');

    }).catch((err) => {
      this.errorMsg = err.message
    })


  }



}