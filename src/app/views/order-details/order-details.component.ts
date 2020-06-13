import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderDto, OrderStatus } from 'src/app/models/order.model';
import { Store, select } from '@ngrx/store';
import { OrderState } from 'src/app/store/order/order.reducer';
import { orderDetailsSelector } from 'src/app/store/order/order.selectors';
import { InventoryItem } from 'src/app/models/inventory.model';
import { loadInventoryList } from 'src/app/store/inventory/inventory.action';
import {
  startGetOrderDetails,
  cancelOrder,
} from 'src/app/store/order/order.action';
import { MatDialog } from '@angular/material/dialog';
import { CancelOrderDialogComponent } from 'src/app/components/cancel-order-dialog/cancel-order-dialog.component';

class OrderDetails implements OrderDto {
  uuid: string;
  status: OrderStatus;
  createdDate: Date;
  createdBy: string;
  createdById: string;
  total: number;
  items: { itemId: string; name: string; price: number }[];
}

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent implements OnInit {
  orderUuid: string;
  order: OrderDetails;
  constructor(
    private route: ActivatedRoute,
    private store: Store<{ order: OrderState; inventory: InventoryItem[] }>,
    private dialog: MatDialog
  ) {
    this.route.paramMap.subscribe(
      (params) => (this.orderUuid = params.get('id'))
    );
    this.store
      .pipe(select(orderDetailsSelector, { orderUuid: this.orderUuid }))
      .subscribe((value) => {
        this.order = value;
      });
  }

  ngOnInit(): void {
    this.store.dispatch(loadInventoryList());
    this.store.dispatch(startGetOrderDetails({ orderUuid: this.orderUuid }));
  }

  cancelOrder() {
    const dialogRef = this.dialog.open(CancelOrderDialogComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(cancelOrder({ orderUuid: this.orderUuid }));
      }
    });
  }
}
