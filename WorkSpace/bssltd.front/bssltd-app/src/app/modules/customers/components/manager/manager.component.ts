import { Component, Output, EventEmitter, Input, ViewChild, ElementRef } from '@angular/core';
import { CustomersService } from '../../../services/customers.service';
import { HttpEventType } from '@angular/common/http';
import {Customer} from '../../../../models';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
 
@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent
     {

     /* createFormGroup() {
        return new FormGroup({
          personalData: new FormGroup({
            email: new FormControl(),
            mobile: new FormControl(),
            country: new FormControl()
           }),
          requestType: new FormControl(),
          text: new FormControl()
        });
      }*/
      createFormGroup() {
        return new FormGroup({
          customer: new FormGroup({
            name: new FormControl(),
            street: new FormControl(),
            city: new FormControl()
           }) 
        });
      }
 // @Output() public invoice: Invoice;
   
  constructor(private service: CustomersService,
    private formBuilder: FormBuilder) {
     this.getCustomers();
     this.contactForm = this.createFormGroup();
  }

  contactForm: FormGroup;
  customers:Customer[];
  name:string;

  public getCustomers( ) {
     
      
      
      this.service.getCustomers().subscribe(
        data => {
          if (data.recordset) {

         
            this.customers=data.recordset
           
          }
        },
        error => {
          console.log(error);          
        }
      );
     
  }

  createFormGroupWithBuilder(formBuilder: FormBuilder) {
    return formBuilder.group({
      personalData: formBuilder.group({
        email: 'defaul@email.com',
        mobile: '',
        country: ''
      }),
      requestType: '',
      text: ''
    });
  }

  // Step 3
  createFormGroupWithBuilderAndModel(formBuilder: FormBuilder) {
    return formBuilder.group({
      personalData: formBuilder.group(new Customer()),
      requestType: '',
      text: ''
    });
  }

  revert() {
    // Resets to blank object
    this.contactForm.reset();

    // Resets to provided model
    this.contactForm.reset({ personalData: new Customer(), requestType: '', text: '' });
  }

  onSubmit() {
    // Make sure to create a deep copy of the form-model
    const result:  any = Object.assign({}, this.contactForm.value);
     
    // Do useful stuff with the gathered data
    this.service.newCustomer(result.customer).subscribe(
      data => {
        console.log(data);
        this.getCustomers();
      },
      error => {
        console.log(error);          
      }
    );
   
  }

}
