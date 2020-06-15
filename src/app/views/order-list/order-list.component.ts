import { Component, OnInit } from '@angular/core';
import { OrderDto, OrderStatus } from 'src/app/models/order.model';
import { Store, select } from '@ngrx/store';
import { OrderState } from 'src/app/store/order/order.reducer';
import {
  startGetOrderList,
  cancelOrder,
} from 'src/app/store/order/order.action';
import { Observable } from 'rxjs';
import { orderListSelector } from 'src/app/store/order/order.selectors';
import { InventoryItem } from 'src/app/models/inventory.model';
import { loadInventoryList } from 'src/app/store/inventory/inventory.action';
import { MatDialog } from '@angular/material/dialog';
import { CancelOrderDialogComponent } from 'src/app/components/cancel-order-dialog/cancel-order-dialog.component';

class OrderListItem implements OrderDto {
  uuid: string;
  status: OrderStatus;
  createdDate: Date;
  createdBy: string;
  createdById: string;
  total: number;
  items: { itemId: string; name: string; price: number }[];
}

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent implements OnInit {
  displayedColumns: string[] = [
    'no',
    'items',
    'date',
    'status',
    'action',
    'cancel',
  ];
  orderList: Observable<OrderListItem[]>;

  constructor(
    private store: Store<{ order: OrderState; inventory: InventoryItem[] }>,
    private dialog: MatDialog
  ) {
    this.orderList = store.pipe(select(orderListSelector));
  }

  ngOnInit(): void {
    this.store.dispatch(loadInventoryList());
    this.store.dispatch(startGetOrderList());
  }

  getColor(status: OrderStatus): string {
    return {
      CREATED: 'accent',
      CONFIRMED: 'primary',
      DELIVERED: '',
      CANCELLED: 'warn',
    }[status];
  }

  cancelOrder(orderUuid: string) {
    const dialogRef = this.dialog.open(CancelOrderDialogComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(cancelOrder({ orderUuid }));
      }
    });
  }
}
