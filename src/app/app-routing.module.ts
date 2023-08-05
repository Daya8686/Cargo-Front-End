import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { UserlistingComponent } from './userlisting/userlisting.component';
import { PriceCalculatorComponent } from './price-calculator/price-calculator.component';
import { CustomerhomeComponent } from './customerhome/customerhome.component';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { AuthGuard } from './guard/auth.guard';
import { CargobookComponent } from './cargobook/cargobook.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { EmployeeComponent } from './employee/employee.component';
import { CargoComponent } from './cargo/cargo.component';
import { RegisterRequestComponent } from './register-request/register-request.component';
import { CustomersComponent } from './customers/customers.component';
import { CitiesComponent } from './cities/cities.component';
import { ProfileComponent } from './profile/profile.component';
import { EmployeeProfileComponent } from './employee-profile/employee-profile.component';
//the routing is done here for all the components with component names and 
//path name need to be declare are use here with this we can perform the routing

const routes: Routes = [  //AuthGard will not allow load any page with url before login
  {path:'' , component:HomeComponent , canActivate:[AuthGuard]}, //its a home componet 
  {path:'register' , component:RegisterComponent },
  {path:'login' , component:LoginComponent },
  // {path:'user' , component:UserlistingComponent,canActivate:[AuthGuard] },
  {path:'city' , component:CitiesComponent},
  {path:'cargoPrice' , component:PriceCalculatorComponent},
  // {path:'customer' , component:CustomerhomeComponent , canActivate:[AuthGuard]},
  {path:'my-profile' , component:ProfileComponent , canActivate:[AuthGuard] ,data:{role:["CustomerUser"]}},
  // {path:'admin' , component:AdminhomeComponent , canActivate:[AuthGuard]},
  {path:'cargo-booking' , component:CargobookComponent , canActivate:[AuthGuard] }, // 
  {path:'my-orders' , component:MyOrdersComponent ,data:{cancel:'true'}, canActivate:[AuthGuard]}, // customer
  {path:'employee' , component:EmployeeComponent , canActivate:[AuthGuard] ,data:{role:"AdminUser"}}, // admin
  {path:'emp-profile' , component:EmployeeProfileComponent , canActivate:[AuthGuard] ,data:{role:"EmployeeUser"}}, // employee
  {path:'cargo' , component:CargoComponent , canActivate:[AuthGuard] ,data:{role:"AdminUser"}}, // admin
  {path:'register-request', component:RegisterRequestComponent , canActivate:[AuthGuard] ,data:{role:"AdminUser"} }, // admin
  {path:'customers', component:CustomersComponent , canActivate:[AuthGuard],data:{ role: ["AdminUser","EmployeeUser"]}}, // admin | employee
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
