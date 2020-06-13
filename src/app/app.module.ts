import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { OrderListComponent } from './views/order-list/order-list.component';
import { OrderDetailsComponent } from './views/order-details/order-details.component';
import { OrderNewComponent } from './views/order-new/order-new.component';
import { ViewBaseComponent } from './components/view-base/view-base.component';

import { InventoryService } from './services/inventory/inventory.service';
import { SortByPipe } from './utilities/pipes/sort-by.pipe';
import { ConfirmModalComponent } from './views/order-new/confirm-modal/confirm-modal.component';
import { StoreModule } from '@ngrx/store';

import { orderReducer } from './store/order/order.reducer';
import { inventoryReducer } from './store/inventory/inventory.reducer';
import { EffectsModule } from '@ngrx/effects';
import { InventoryEffects } from './store/inventory/inventory.effects';
import { OrderService } from './services/order/order.service';
import { environment } from '../environments/environment';
import { BaseUrlInterceptor } from './utilities/interceptor/base-url.interceptor';
import { OrderEffects } from './store/order/order.effects';
import { StatusComponent } from './components/status/status.component';
import { CancelOrderDialogComponent } from './components/cancel-order-dialog/cancel-order-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    OrderListComponent,
    OrderDetailsComponent,
    OrderNewComponent,
    ViewBaseComponent,
    SortByPipe,
    ConfirmModalComponent,
    StatusComponent,
    CancelOrderDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    MatChipsModule,
    StoreModule.forRoot({ order: orderReducer, inventory: inventoryReducer }),
    EffectsModule.forRoot([InventoryEffects, OrderEffects]),
  ],
  providers: [
    InventoryService,
    OrderService,
    { provide: 'BASE_API_URL', useValue: environment.BASE_API_URL },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BaseUrlInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
