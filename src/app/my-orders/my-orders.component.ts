import { Component, DoCheck, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router'
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements DoCheck{
  iscancelEnable:Boolean=false;
  orders: any = [];
	OriginalOrders: any = [];
  errorMsg=''
  customers:any=[];
  cargos: any = [];

  role:string='';
  userId:any='';
  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private service: AuthService
  ){
    this.getCargos()
    this.getCustomers()
    this.getOrders()    
  }


  
  getCustomers() {
    this.service.getCustomers().then((res) => {
        this.customers = res
    }).catch((err) => {
      this.errorMsg = err.message
    })
  }

	getCargos() {
		this.service.getCargos().then((res) => {
			this.cargos = res
		}).catch((err) => {
      this.errorMsg = err.message
		})
	}


  findUserId(){
    let userEmail = this.service.getUserEmail();

    let User = this.customers.find((cus: any) => (
      cus.customerEmail.toLowerCase() == userEmail.toLowerCase()
    ))

    return User.customerId || 0;
  }


  
  ngDoCheck(): void {

    this.role = this.service.getRole().toLocaleLowerCase();
    if(!this.role.match('customer')){ return }
    this.userId = this.findUserId()

    // console.log(this.route,'route')
    if(this.route.snapshot.queryParams['c'] =='true'){

      this.iscancelEnable =  true;
    }else{
      this.iscancelEnable =  false;
    }

    // console.log(this.iscancelEnable,'iscancelEnable')
  }



  filterSearch(e: any) {
		const term = e.value;
		let ORDERS = this.OriginalOrders;

		const result = ORDERS.filter((ord: any) => {
			return (ord.customerName.toLowerCase().match(term.toLowerCase()) || ord.customerPhone.toLowerCase().match(term.toLowerCase()) )
		})

		this.orders = result
	}

  updateOrderArr(res:any){
    const data = res;
    const customers = this.customers;
    const cargos = this.cargos;
    let result = data.map((ord:any) => {
      let customer = customers.find((c:any) => c.customerId == ord.customerId )
      let cargo = cargos.find((c:any) => c.cargoCategoryId == ord.cargoCategoryId )
      let combined = {...ord, ...customer, ...cargo}
      return combined;
    });


    if(this.role.match('customer')){
      result = result.filter((ord:any)=>{
        ord.customerId == this.userId;
      })
    }
    
    console.log(result,'aa');
    
    this.orders = result
    this.OriginalOrders = result
  }

  updateResponse(res:any){
    console.log(res);
    const data = res;
    const customers = this.customers;
    console.log(customers);
    let result = data.map((ord:any) => {
      let customer = customers.find((c:any) => c.customerId == ord.cargoorderId )
      console.log(customer)
      let combined = {...ord, ...customer, }
      return combined;
    });
    console.log(result,this.userId);
    if(this.role.match('customer')){
      result = result.filter((ord:any)=>{
       return  ord.cargoorderId == this.userId;
      })
    }
    
    console.log(result,'aa');
    
    this.orders = result
    this.OriginalOrders = result
  }


  getOrders() {
    this.service.getOrders().then((res) => {
        // this.updateOrderArr(res) // this will add customer data and cargoCategory details along with this data.
        this.updateResponse(res)
    }).catch((err) => {
      this.errorMsg = err.message
    })
  }



  cancelOrder(order:any){
    this.service.cancelOrder(order.cargoorderDetailsId).then((res) => {
  }).catch((err) => {
    this.errorMsg = err.message
  })
  }



}