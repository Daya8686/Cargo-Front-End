import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

type profileInterface = {
  employeeId: any,
  employeeFName: string,
  employeeLName: string,
  birthDate: string,
  employeeEmail: string,
  street: string,
  phone: string,
  joiningDate: string,
  dateOfResign: string,
  isAdmin: boolean,
  cityId: any
}


@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.css']
})
export class EmployeeProfileComponent {
  submitted = false;
  errorMsg = "";
  cities :any = [];
  allEmployeeList: any = [];
  empEmail: string = "";
  thisEmpId:any = '';
  constructor(
    private builder: FormBuilder,
    private service: AuthService,
    private router: Router
  ) {
    this.empEmail = this.service.getUserEmail();
    this.profileForm.controls['employeeEmail'].setValue(this.empEmail);
    this.getCities()
    
    this.getEmployees();
    
    
    this.getUserDetails()


  }
  getEmployees() {
    this.service.getEmployees().then((res) => {
      this.allEmployeeList = res;
      this.setUserId()
    }).catch((err) => {
      this.errorMsg = err.message
    })
  }

  setUserId() {
    let ID = sessionStorage.getItem('employeeId')
    if(ID){
      this.thisEmpId = ID;
      return;
    }
    let thisEmployee = this.allEmployeeList.find((cus: any) => {
      // console.log("aa",cus, this.customerEmail)
      return cus.employeeEmail.toLowerCase() == this.empEmail.toLowerCase()
    })

    if(thisEmployee){
      sessionStorage.setItem('employeeId', thisEmployee.employeeId)
      this.thisEmpId = thisEmployee.employeeId;
    }else{
      this.thisEmpId = '';
    }


  }

  profileForm = this.builder.group({
    
    employeeId: this.builder.control(0),
    employeeFName: this.builder.control('', Validators.required),
    employeeLName: this.builder.control('', Validators.required),
    birthDate: this.builder.control('', Validators.required),
    employeeEmail: this.builder.control('', Validators.compose([Validators.required, Validators.email])),
    street: this.builder.control('', Validators.required),
    phone: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(10),Validators.maxLength(10)])),
     joiningDate: this.builder.control('',Validators.required),
     dateOfResign: this.builder.control('1900-01-01'),
    isAdmin: this.builder.control(false, Validators.required),
    cityId: this.builder.control('', Validators.required),

  })


  getUserDetails() {

    // let userId = this.service.getUserId() || null;
   // let userId = this.thisEmpId || null;
    let userId = Number(sessionStorage.getItem('employeeId')) || null;
    if(!userId ){ this.setUserId(); return }


    this.service.getEmployeeDetails(userId).then((res: any) => {
      this.errorMsg = '';

      if (res) {
        this.profileForm.setValue(res)

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
    // let id = this.profileForm.value.employeeId

    let id = this.thisEmpId;

    if(!id || id==0 || id.length==0){
      payload.employeeId = 0;
      this.service.addEmployee(payload).then((res) => {
        this.errorMsg = '';
        this.submitted = false;
      }).catch((err) => {
        this.errorMsg = err.message
      })

    }else{
      this.service.updateEmployee(id, payload).then((res) => {
        this.errorMsg = '';
        this.submitted = false;
      }).catch((err) => {
        this.errorMsg = err.message
      })
    }


    // this.service.updateEmployee(id,payload).then((res) => {
    //   this.errorMsg = '';
    //   this.submitted = false;
    // }).catch((err) => {
    //   this.errorMsg = err.message
    // })


  }


}