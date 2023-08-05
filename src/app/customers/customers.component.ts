import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  closeResult = '';
  submitted = false;
  errorMsg = '';
  users = [ ];
  OriginalUsers = [];
  selectedEmp = {
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    customerAddress: '',
    cityId: '',
  };
  cities: any = [];

  constructor(
    private modalService: NgbModal,
    private builder: FormBuilder,
    private service: AuthService,
    private router: Router
  ) {
    this.getCities()

  }

  getCities() {
		this.service.getCities().then((res) => {
			this.cities = res;
		}).catch((err) => {
		})
	}


  ngOnInit(): void {
    this.getCustomers()
  }


  handleDeleteUser(emp: any) {
    this.service.deleteEmployee(emp.employeeId).then((res) => {
      if (res.code == 200) {
      }
    }).catch((err) => {
      this.errorMsg = "Unknown Error Occured"
    })
  }

  handleUpdateUser(emp: any) {
    this.selectedEmp = emp;
    this.empForm.setValue({
      customerId:emp?.customerId,
      customerName: emp?.customerName || '',
      customerEmail: emp?.customerEmail || '',
      customerPhone: emp?.customerPhone || '',
      customerAddress: emp?.customerAddress || '',
      cityId: emp?.cityId || '',
    })
  }


  getCustomers() {
    this.service.getCustomers().then((res) => {
        this.users = res
        this.OriginalUsers = res
    }).catch((err) => {
      this.errorMsg = "Unknown Error Occured"
    })
  }



  filterSearch(e: any) {
    const term = e.value;
    let ORGLIST = this.OriginalUsers;

    const result = ORGLIST.filter((item: any) => {
      return (item.customerName.toLowerCase().match(term.toLowerCase()) ||
        item.customerPhone.toLowerCase().match(term.toLowerCase()) 
        // || item.customerId.match(term.toLowerCase())
      )
    })

    this.users = result
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

  empForm = this.builder.group({
    customerId: this.builder.control(''),
    customerName: this.builder.control('', Validators.required),
    customerEmail: this.builder.control('', Validators.compose([Validators.required, Validators.email])),
    customerPhone: this.builder.control('', Validators.required),
    customerAddress: this.builder.control('', Validators.required),
    cityId: this.builder.control(''),
  })


  updateCustomerSubmit() {
  	console.log(this.empForm.value)
  	if (this.empForm.invalid) {
  		return;
  	}

  	let payload = this.empForm.value
    let id = this.empForm.value.customerId
    this.errorMsg = '';

  	  this.service.updateUser(id,payload).then((res) => {
        this.modalService.dismissAll()
        this.getCustomers()
  	  }).catch((err) => {
        this.errorMsg = err.message
  	  })

  }
}