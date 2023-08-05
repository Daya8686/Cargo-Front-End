import { Component } from '@angular/core';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
@Component({
	selector: 'app-cargo',
	templateUrl: './cargo.component.html',
	styleUrls: ['./cargo.component.css']
})
export class CargoComponent {  //CargoComponent is a component name 
	errorMsg = ''; //variables are declared here
	closeResult = '';
	cargos: any = [];
	OriginalCargos: any = [];
	// selectedRow = {
	// 	cargoCategoryId: '',
	// 	cargoCategoryType: '',
	// 	cargoorderId: '',
	// 	cargoPrice: '',
	//   };
	constructor( //constructor is used to perfrom the task when this component is called from app.routing 
				//for performing a task this all parameter variables are assined with values 
		private modalService: NgbModal, //NgbModal is used to create a templte ng-templte with container
		private service: AuthService,  //AuthService is a component is a Service component which is assigned to service variable name
		private builder: FormBuilder, //FormBuilder is used to create a form which is assigned to a builder
	) {

		this.getCargos() //when class is called then at that point this constructor will also call this method
	}



	cargoForm = this.builder.group({  //this is a FormGroup functionality which is used for group the formcontrol
		cargoCategoryId: this.builder.control(0), //FormGroup has a name here it is cargoForm and for all the
		cargoCategoryType: this.builder.control('', Validators.required),//form components we create a formcontrol
		// cargoorderId: this.builder.control(''),
		cargoPrice: this.builder.control(0, Validators.required), //here we are perfoming the validation and calling formControlNames of elemnts
	})

/**** it will handle the update** */
	handleUpdate(emp: any) {  //the update method which is get things updated when the button is clicken in cargo update
		this.cargoForm.setValue({ //then it is called and it will take values from cargoForm and sets the elemts with value
			cargoCategoryId: emp.cargoCategoryId || 0, //if cargoCategoryId has a Id then it will not change or else it is assigned with 0 so it can auto assign values in API from backed
			cargoCategoryType: emp.cargoCategoryType || '',
			// cargoorderId: emp.cargoorderId || '',
			cargoPrice: emp.cargoPrice || 0,
		})
	}

	/**update of Cargo is done here */
	updateCargoType() {
		if (this.cargoForm.invalid) { //if cargoForm has some validation issuers then the Invalid is truew so it will return error
			return;
		}

		/*creating a varible name with payload which will take all the valuies of cargoForm 
		and from this payload variable contains values of the cargoForm and fromthis the data is updated in API
		we use this payload data and transfor to the updateCargo function which is present in the Auth.service.ts
		which is assigned to service variable in constructor parameter and this.service.updateCargo with payload
		and the perticular id is passed with it do the value get change in that perticular id */
		let payload = this.cargoForm.value;
		let id = this.cargoForm.value.cargoCategoryId;
		console.log(payload, id, 'cargo update')

		this.service.updateCargo(id, payload).then((res) => {
			this.errorMsg = ''; 
			this.getCargos();
		}).catch((err) => {
			this.errorMsg = "Unknown Error Occured" //error variable which is created in class is used here
		})

		this.modalService.dismissAll() //this method is called when user dismiss the function of ng-templete container
	}

	//This function is for search bar
	filterSearch(e: any) {
		const term = e.value; //entered value is taken and searched here dynamically
		let CARGOS = this.OriginalCargos;

		const result = CARGOS.filter((cargo: any) => {
			return (cargo.cargoCategoryType.toLowerCase().match(term.toLowerCase())) //we will make this alphabets in lowercase here and search
		})

		this.cargos = result
	}



//from here the data is geting in to UI tables
	getCargos() {
		this.service.getCargos().then((res) => {
			this.cargos = res
			this.OriginalCargos = res
		}).catch((err) => {
			this.errorMsg = "Unknown Error Occured"
		})
	}
//this is a method for ng-templete to perform the task
	open(content: any) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;

			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);

	}

	private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return `with: ${reason}`;
		}
	}
//the form get cleaned here  
	clearform() {
		this.cargoForm.reset();
	}


//add method will start from here
	addCargoType() {
		if (this.cargoForm.invalid) {
			return;
		}



		let payload = this.cargoForm.value;

		payload.cargoCategoryId = 0
		this.service.addCargo(payload).then((res) => {
			this.errorMsg = '';
			this.getCargos()
		}).catch((err) => {
			this.errorMsg = err.message
		})

		this.modalService.dismissAll()
	}


}
