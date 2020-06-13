import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderListComponent } from './views/order-list/order-list.component';
import { OrderNewComponent } from './views/order-new/order-new.component';
import { OrderDetailsComponent } from './views/order-details/order-details.component';


const routes: Routes = [{
  path: '',
  component: OrderListComponent
}, {
  path: 'new',
  component: OrderNewComponent
}, {
  path: 'details/:id',
  component: OrderDetailsComponent
}, {
  path: '**',
  redirectTo: '/'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
