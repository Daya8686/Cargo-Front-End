import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-price-calculator',
  templateUrl: './price-calculator.component.html',
  styleUrls: ['./price-calculator.component.css']
})
export class PriceCalculatorComponent {
  cargoCategory:any=[];
  selectedCargoAmount:Number= 0;
  finalPrice:Number=0;
  constructor(
    private builder: FormBuilder,
    private service : AuthService
  ){
    this.getCargos()
  }

  registerForm = this.builder.group({
    weight: this.builder.control(''),
    quantity: this.builder.control(''),
  })

  getCargos() {
		this.service.getCargos().then((res) => {
			this.cargoCategory = res
		}).catch((err) => {
		})
	}



  selectCargoCat(e:any){ this.selectedCargoAmount = e.target.value || 0; }

  calculateFare(){
    let Data = this.registerForm.value;
    // console.log( Number(Data.quantity) * Number(Data.weight) , Number(this.selectedCargoAmount),'s')
    this.finalPrice = Number(Data.quantity) * Number(Data.weight)* Number(this.selectedCargoAmount);
  }



}
