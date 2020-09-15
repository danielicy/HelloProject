import { Component, OnInit ,ViewChild} from '@angular/core';
import {ManagerComponent} from './components/manager/manager.component';
import {Customer } from '../../models';


import { from } from 'rxjs';
@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  //@ViewChild('customer',{static: false}) customer :UploaderComponent;
  
  constructor() { }
 

  ngOnInit() {
  }

}
