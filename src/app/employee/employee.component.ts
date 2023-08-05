import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-employee',
	templateUrl: './employee.component.html',
	styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
	closeResult = '';
	submitted :boolean= false;
	errorMsg:string = '';
	employees:any = [];
	OriginalEmployees:any = [];
	selectedEmp :any= {};
	cities: any = [];

	constructor(
		private modalService: NgbModal,
		private builder: FormBuilder,
		private authService: AuthService,
		private router: Router
	) {
		this.getCities()

	}

	getCities() {
		this.authService.getCities().then((res) => {
			this.cities = res;
		}).catch((err) => {
		})
	}


	empForm = this.builder.group({
		employeeId: this.builder.control(0),
		employeeFName: this.builder.control('', Validators.required),
		employeeLName: this.builder.control('', Validators.required),
		birthDate: this.builder.control('', Validators.required),
		employeeEmail: this.builder.control('', Validators.compose([Validators.required, Validators.email])),
		street: this.builder.control('', Validators.required),
		phone: this.builder.control('', Validators.required),
		joiningDate: this.builder.control('', Validators.required),
		dateOfResign: this.builder.control(new Date()),
		isAdmin: this.builder.control(true),
		cityId: this.builder.control(''),
	})

	ngOnInit(): void {
		this.getEmployees()
	}


	handleDeleteUser(emp: any) {
		this.authService.deleteEmployee(emp.employeeId).then((res) => {
			if (res.code == 200) {
			}
		}).catch((err) => {
			this.errorMsg = err.message
		})
	}

	handleUpdateUser(emp: any) {
		this.selectedEmp = emp
		this.empForm.setValue(emp)
	}


	getEmployees() {

		this.authService.getEmployees().then((res) => {
			this.employees = res;
			this.OriginalEmployees = res;

		}).catch((err) => {
			this.errorMsg = err.message
		})

		// let dummy = [
		// 	{
		// 		"employeeId": 1,
		// 		"employeeFName": "string",
		// 		"employeeLName": "string",
		// 		"birthDate": "2023-06-14T06:26:19.927Z",
		// 		"employeeEmail": "user@example.com",
		// 		"street": "string",
		// 		"phone": "string",
		// 		"joiningDate": "2023-06-14T06:26:19.927Z",
		// 		"dateOfResign": "2023-06-14T06:26:19.927Z",
		// 		"isAdmin": true,
		// 		"cityId": 0
		// 	}
		// ]

		// this.employees = dummy;
		// this.OriginalEmployees = dummy;

	}
  

	filterSearch(e: any) {
		const term = e.value;
		let ORGLIST = this.OriginalEmployees;

		const result = ORGLIST.filter((item: any) => {
			return (item.employeeFName.toLowerCase().match(term.toLowerCase()) ||
				item.employeeLName.toLowerCase().match(term.toLowerCase()) ||
				item.phone.toLowerCase().match(term.toLowerCase()) ||
				item.employeeId.toString().match(term.toLowerCase())
			)
		})

		this.employees = result
	}





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




	addEmployeeSubmit() {
		console.log(this.empForm.value)
		if (this.empForm.invalid) {
			return;
		}

		let payload = this.empForm.value
		this.errorMsg = '';
		payload.employeeId = 0
		this.authService.addEmployee(payload).then((res) => {
			this.getEmployees()
		}).catch((err) => {
			this.errorMsg = err.message
		})

		this.modalService.dismissAll()
	}


	updateEmployeeSubmit() {
		console.log(this.empForm.value)
		if (this.empForm.invalid) {
			return;
		}

		let payload = this.empForm.value
		let id = this.empForm.value.employeeId

		this.errorMsg = '';

		this.authService.updateEmployee(id,payload).then((res) => {
			this.getEmployees()
		}).catch((err) => {
			this.errorMsg = err.message
		})

		this.modalService.dismissAll()
	}

}