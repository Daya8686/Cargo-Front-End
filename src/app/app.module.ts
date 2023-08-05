import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { UserlistingComponent } from './userlisting/userlisting.component';
import { PriceCalculatorComponent } from './price-calculator/price-calculator.component';
import { CustomerhomeComponent } from './customerhome/customerhome.component';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { CargobookComponent } from './cargobook/cargobook.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { EmployeeComponent } from './employee/employee.component';
import { CargoComponent } from './cargo/cargo.component';
import { RegisterRequestComponent } from './register-request/register-request.component';
import { CustomersComponent } from './customers/customers.component';
import { CitiesComponent } from './cities/cities.component';
import { ProfileComponent } from './profile/profile.component';
import { EmployeeProfileComponent } from './employee-profile/employee-profile.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    UserlistingComponent,
    PriceCalculatorComponent,
    CustomerhomeComponent,
    AdminhomeComponent,
    CargobookComponent,
    MyOrdersComponent,
    EmployeeComponent,
    CargoComponent,
    RegisterRequestComponent,
    CustomersComponent,
    CitiesComponent,
    ProfileComponent,
    EmployeeProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
