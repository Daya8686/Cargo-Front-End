import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  submitted = false;
  errorMsg = '';
  msg = '';

  constructor(
    private builder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {

  }

  registerForm = this.builder.group({
    // id: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(5)])),
    username: this.builder.control('', Validators.required),
    email: this.builder.control('', Validators.compose([Validators.required, Validators.email])),
    password: this.builder.control('',  Validators.compose([Validators.required, Validators.minLength(6)])),
    cnfpassword: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(6) ])),
    role: this.builder.control('',  Validators.required),

  })



  get a() {
    return this.registerForm.controls;
  }


  
  register() {
    console.log(this.registerForm.controls)
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    let userData = this.registerForm.value
    let payload = {
      "userName": userData?.username,
      "password": userData?.password,
      "confirmPassword": userData?.cnfpassword,
      "email": userData?.email,
      isApprove:true,
      "role":userData?.role
    }

    this.authService.register(payload).then((res) => {
      // if (res.code == 200) {
        this.errorMsg = '';
        this.submitted = false;
        this.router.navigate(['login'])
      // }
    }).catch((err) => {
      this.errorMsg = err.message
    })


  }



  setLoginFormType(type:string){

  }
  
}
