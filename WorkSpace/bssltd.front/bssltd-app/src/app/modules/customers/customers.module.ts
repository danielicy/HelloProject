import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagerComponent } from './components/manager/manager.component';
 import {CustomersRoutingModule} from './customers-routing.module';
import {CustomersService} from '../services/customers.service';
import {CustomersComponent} from './customers.component'
import {CoreModule} from '../../core/core.module';
import { ReactiveFormsModule } from '@angular/forms'

@NgModule({
  declarations: [CustomersComponent,
    ManagerComponent],
  imports: [
    CommonModule,
    CoreModule,
    CustomersRoutingModule,
    ReactiveFormsModule
  ],
  providers :[CustomersService],
  exports:[CustomersComponent,
    ManagerComponent]
})
export class CustomersModule { }
