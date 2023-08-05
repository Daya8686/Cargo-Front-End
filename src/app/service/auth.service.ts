import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseAPI = 'https://localhost:7097/api/'
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(this.baseAPI)
  }


  isLoggedin() {
    return localStorage.getItem('loginData') != null
  }


  getRole() {
    let role = ''
    if (this.isLoggedin()) {
      const data = localStorage.getItem('loginData')
      if (data != null) {
        role = JSON.parse(data).role
      }
    }
    return role
  }


  getUsername() {
    let userName = ''
    if (this.isLoggedin()) {
      const data = localStorage.getItem('loginData')
      if (data != null) {
        userName = JSON.parse(data).username
      }
    }
    return userName
  }

  getUserId() {
    let userId = ''
    if (this.isLoggedin()) {
      const data = localStorage.getItem('loginData')
      if (data != null) {
        userId = JSON.parse(data)?.status[0].id || ''
      }
    }
    return userId
  }

  getUserEmail() {
    let userId = ''
    if (this.isLoggedin()) {
      const data = localStorage.getItem('loginData')
      if (data != null) {
        userId = JSON.parse(data)?.status[0].email || ''
      }
    }
    return userId
  }


  loginUser(payload: any): Promise<any> {  //Promise is a Async funtion which is first used from java Script
    //and it is extended this to TS and we use it here by this we need get the out put either resolve means solution 
    //and reject means error
    return new Promise((resolve, reject) => {
      this.http.post(this.baseAPI + 'Account/login', payload).subscribe(  // we posting data to API with http.post
      // with baseApi and by taking end point and posting the payload Payload means :- All the data coming from UI 
        (res) => {
          resolve(res); //success output if successfulyy done else error
        },
        (error) => {
          if (error && error.error && error.error.message) {
          } else {
          }
          reject(error);// error ouput
        }
      );
    });
  }



  register(payload: any): Promise<any> {
    let role = payload?.role;
    delete (payload.role);
    console.log(payload, 'register payload')



    return new Promise((resolve, reject) => {

      if (role == 'admin') {
        this.http.post(this.baseAPI + 'Account/register-admin', payload).subscribe(
          (res) => {
            resolve(res);
          },
          (error) => {
            if (error && error.error && error.error.message) {
            } else {
            }
            reject(error);
          }
        );
      } else if (role == 'employee') {
        this.http.post(this.baseAPI + 'Account/register', payload).subscribe(
          (res) => {
            resolve(res);
          },
          (error) => {
            if (error && error.error && error.error.message) {
            } else {
            }
            reject(error);
          }
        );
      } else if (role == 'customer') {
        this.http.post(this.baseAPI + 'Account/register-customer', payload).subscribe(
          (res) => {
            resolve(res);
          },
          (error) => {
            if (error && error.error && error.error.message) {
            } else {
            }
            reject(error);
          }
        );
      }

    });

  }

  // getEmployees() {
  //   return this.http.get(this.baseAPI + 'api/Employees')
  // }

  
  addEmployee(payload: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.baseAPI + 'Employees', payload).subscribe(
        (res) => {
          resolve(res);
        },
        (error) => {
          if (error && error.error && error.error.message) {
          } else {
          }
          reject(error);
        }
      );
    });
  }
  
  getEmployees(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.baseAPI + 'Employees').subscribe(
        (res) => {
          resolve(res);
        },
        (error) => {
          if (error && error.error && error.error.message) {
          } else {
          }
          reject(error);
        }
      );
    });
  }


  
  deleteEmployee(emp_id:Number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.delete(this.baseAPI + 'Employees/'+emp_id).subscribe(
        (res) => {
          resolve(res);
        },
        (error) => {
          if (error && error.error && error.error.message) {
          } else {
          }
          reject(error);
        }
      );
    });
  }


  updateEmployee(id:any,payload: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.put(this.baseAPI + 'Employees/'+id, payload).subscribe(
        (res) => {
          resolve(res);
        },
        (error) => {
          if (error && error.error && error.error.message) {
          } else {
          }
          reject(error);
        }
      );
    });
  }

  getEmployeeDetails(userId: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.baseAPI + 'Employees/'+userId ).subscribe(
        (res) => {
          resolve(res);
        },
        (error) => {
          if (error && error.error && error.error.message) {
          } else {
          }
          reject(error);
        }
      );
    });
  }

  addCustomer(payload: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.baseAPI + 'Customers', payload).subscribe(
        (res) => {
          resolve(res);
        },
        (error) => {
          if (error && error.error && error.error.message) {
          } else {
          }
          reject(error);
        }
      );
    });
  }
  

  
  getCustomers(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.baseAPI + 'Customers').subscribe(
        (res) => {
          resolve(res);
        },
        (error) => {
          if (error && error.error && error.error.message) {
          } else {
          }
          reject(error);
        }
      );

      // let resp = [
      //   {
      //     "customerId": "4567654345-6fverrgd-56efdf4fd",
      //     "customerName": "amrit",
      //     "customerEmail": "user@example.com",
      //     "customerPhone": "345678",
      //     "customerAddress": "stringstringstr",
      //     "customerZip": 0,
      //     "cityId": 0
      //   },
      //   {
      //     "customerId": "4567654345-6fverrgd-56efdf4fd",
      //     "customerName": "asda mrit",
      //     "customerEmail": "user@example.com",
      //     "customerPhone": "12345",
      //     "customerAddress": "stringstringstr",
      //     "customerZip": 0,
      //     "cityId": 0
      //   },
      //   {
      //     "customerId": 3,
      //     "customerName": "hdg ",
      //     "customerEmail": "user@example.com",
      //     "customerPhone": "98765",
      //     "customerAddress": "stringstringstr",
      //     "customerZip": 0,
      //     "cityId": 0
      //   }
      // ]
      // resolve(resp)
    });
  }


  getuserDetails(userId: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.baseAPI + 'Customers/'+userId ).subscribe(
        (res) => {
          resolve(res);
        },
        (error) => {
          if (error && error.error && error.error.message) {
          } else {
          }
          reject(error);
        }
      );
    });
  }


  updateUser(id:any,payload: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.put(this.baseAPI + 'Customers/'+id, payload).subscribe(
        (res) => {
          resolve(res);
        },
        (error) => {
          if (error && error.error && error.error.message) {
          } else {
          }
          reject(error);
        }
      );
    });
  }




  cargoBook(payload: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.baseAPI + 'CargoOrderDetails', payload).subscribe(
        (res) => {
          resolve(res);
        },
        (error) => {
          if (error && error.error && error.error.message) {
          } else {
          }
          reject(error);
        }
      );
    });
  }






  getCities(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.baseAPI + 'Cities').subscribe(
        (res) => {
         
          resolve(res);
        },
        (error) => {
          if (error && error.error && error.error.message) {
          } else {
          }
          reject(error);
        }
      );

      // let resp = [
      // 		{
			// 	cityName: 'Jaipur',
			// 	status: 'active',
			// 	cityId: 1
			// },
			// {
			// 	cityName: 'ajmer',
			// 	status: 'active',
			// 	cityId: 12
			// },
			// {
			// 	cityName: 'russia',
			// 	status: 'active',
			// 	cityId: 3
			// },
			// {
			// 	cityName: 'udaipur',
			// 	status: 'active',
			// 	cityId: 56
			// },
			// {
			// 	cityName: 'kashmir',
			// 	status: 'active',
			// 	cityId: 87
			// },
        
      // ]
      // resolve(resp)
    });
  }

  




  getCargos(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.baseAPI + 'CargoCategories').subscribe(
        (res) => {
         
          resolve(res);
        },
        (error) => {
          if (error && error.error && error.error.message) {
          } else {
          }
          reject(error);
        }
      );
      // let resp = [
      //   {
      //     "cargoCategoryId": 1,
      //     "cargoCategoryType": "type a",
      //     "cargoPrice": 100
      //   },
      //   {
      //     "cargoCategoryId": 2,
      //     "cargoCategoryType": "type B",
      //     "cargoPrice": 200
      //   },
        
      // ]
      // resolve(resp)
    });
  }


  updateCargo(id:any , payload: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.put(this.baseAPI + 'CargoCategories/'+id , payload).subscribe(
        (res) => {
          resolve(res);
        },
        (error) => {
          if (error && error.error && error.error.message) {
          } else {
          }
          reject(error);
        }
      );
    });
  }

  
  addCargo(payload: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.baseAPI + 'CargoCategories', payload).subscribe(
        (res) => {
          resolve(res);
        },
        (error) => {
          if (error && error.error && error.error.message) {
          } else {
          }
          reject(error);
        }
      );
    });
  }


  

  getOrders(): Promise<any> {
    return new Promise((resolve, reject) => {
     // this.http.get(this.baseAPI + 'CargoOrders').subscribe(
      this.http.get(this.baseAPI + 'CargoOrderDetails').subscribe(
        (res) => {
          resolve(res);
        },
        (error) => {
          if (error && error.error && error.error.message) {
          } else {
          }
          reject(error);
        }
      );

      // let resp = [
      //   {
      //     "cargoorderDetailsId": "1",
      //     "cargoorderDate": "2023-06-15T16:10:44.995Z",
      //     "amount": 0,
      //     "quantity": 0,
      //     "status": "string",
      //     "toCity": "string",
      //     "fromCity": "string",
      //     "cargoorderId": "4567654345-6fverrgd-56efdf4fd",
      //   }
        
      // ]
      // resolve(resp)

    });
  }

  cancelOrder(order_id:number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.delete(this.baseAPI + 'CargoOrderDetails/'+order_id).subscribe(
        (res) => {
          resolve(res);
        },
        (error) => {
          reject(error);
          return error
        }
      );
    });
  }


}