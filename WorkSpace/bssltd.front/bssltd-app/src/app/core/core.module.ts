import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Constants } from '../config/constants'
import {ApihttpService} from '../shared/services/apihttp.service';
import {ApiEndpointsService} from '../shared/services/api-endpoints.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports:[],
  providers:[ApihttpService,ApiEndpointsService,Constants]

})
export class CoreModule { constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
  if (parentModule) {
    throw new Error(
      'CoreModule est déjà chargé. Importer le uniquement dans AppModule');
  }
}}
