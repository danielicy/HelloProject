import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './modules/general/home/home.component';

const routes: Routes = [{
  path: '',component: HomeComponent,
},
{
  path: 'customers',
  loadChildren: () => import('./modules/customers/customers.module')
    .then(mod => mod.CustomersModule)
}];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }