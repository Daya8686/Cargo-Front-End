import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  password: boolean = false;
  submitted = false;
  errorMsg = '';
  msg = '';
  constructor(
    private builder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    localStorage.clear() //this functions are Called first and this will clear the localstorge and sessionStorage data
    sessionStorage.clear()
  }

  loginForm = this.builder.group({
    username: this.builder.control('', Validators.required), //forControllerName is taken here
    password: this.builder.control('', Validators.required), //Validation is done here and to maintain form
  })

  get a() {
    return this.loginForm.controls;
  }

  login() {
    console.log(this.loginForm,'xx')
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    let userData = this.loginForm.value
    let payload = {
      "userName": userData?.username,
      "password": userData?.password,
      "rememberMe": true
    }

    
    this.authService.loginUser(payload).then((res) => {
   
        this.errorMsg = '';
        this.submitted = false;
        localStorage.setItem('loginData', JSON.stringify(res))
        this.router.navigate([''])
      
    }).catch((err) => {
      this.errorMsg = err.message
    })

    // let dummyResp = {
    //   token:'11231egfsahjfdssdsfghjkhgfdsaqwertyukfd45uhbvcsq345yjnbvdertyhjnbdghnbweyujnbdsw4567uikjnbvcsw4567ujnbcsertyh',
    //   expiration:"2023-06-14T05:14:35z",
    //   userName: userData.username,
    //   role: 'AdminUser',
    //   status:{
    //     isApprove:false,
    //     id:"4567654345-6fverrgd-56efdf4fd"
    //   }
    // }
    // localStorage.setItem('loginData', JSON.stringify(dummyResp))
    // this.router.navigate([''])


  }

  showPassword() {
    this.password = !this.password;
  }

}
