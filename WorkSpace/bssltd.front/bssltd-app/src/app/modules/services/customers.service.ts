import { Injectable } from '@angular/core';
 
import {ApiEndpointsService,ApihttpService} from '../../shared/services';
 


@Injectable({
  providedIn: 'root'
})
export class CustomersService {


  newCustomer(customer) {
    return this.apiHttpService.post(this.apiEndpointsService.getPointsEndpoint('customer'),customer);
  }

  constructor(private apiHttpService: ApihttpService,
    private apiEndpointsService: ApiEndpointsService) { }

  
  public getCustomers( ) : any{    
    return this.apiHttpService.get(this.apiEndpointsService.getPointsEndpoint('customers') );
 
  }
}
