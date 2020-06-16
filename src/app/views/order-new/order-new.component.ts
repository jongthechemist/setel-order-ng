import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl
} from '@angular/forms';
import { InventoryItem } from 'src/app/models/inventory.model';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { Store, select } from '@ngrx/store';
import { OrderState, FetchStatus } from '../../store/order/order.reducer';
import {
  addNewOrderItem,
  removeNewOrderItem,
  startSubmitOrder,
  clearNewOrder,
} from 'src/app/store/order/order.action';
import { loadInventoryList } from 'src/app/store/inventory/inventory.action';
import { map, find } from 'rxjs/operators';
import {
  newOrderSelectorWithName,
  newOrderTotalPriceSelector,
  orderSubmissionStatusSelector,
} from 'src/app/store/order/order.selectors';
import { inventoryListSelector } from 'src/app/store/inventory/inventory.selectors';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-new',
  templateUrl: './order-new.component.html',
  styleUrls: ['./order-new.component.scss'],
})
export class OrderNewComponent implements OnInit {
  inventoryList: Observable<InventoryItem[]>;
  inventorySelectionControl: FormControl;

  orderList: Observable<{ itemId: string; name: string; price: number }[]>;
  totalPrice: Observable<number>;
  orderSubmissionStatus: Observable<FetchStatus>;

  constructor(
    private store: Store<{ order: OrderState; inventory: InventoryItem[] }>,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.inventorySelectionControl = formBuilder.control({});
    this.orderList = store.pipe(select(newOrderSelectorWithName));
    this.inventoryList = store.pipe(select(inventoryListSelector));
    this.totalPrice = store.pipe(select(newOrderTotalPriceSelector));
    this.orderSubmissionStatus = store.pipe(
      select(orderSubmissionStatusSelector)
    );
  }

  ngOnInit(): void {
    this.store.dispatch(loadInventoryList());
    this.orderSubmissionStatus.subscribe((status) => {
      if (status === 'SUCCESS') {
        this.store.dispatch(clearNewOrder());
        this.router.navigate(['']);
      }
    });
  }

  canEdit() {
    return this.orderSubmissionStatus.pipe(map((status) => status === 'NEW'));
  }

  canAdd() {
    return !this.inventorySelectionControl.value.uuid;
  }

  canSubmit() {
    return this.orderList.pipe(
      map((value) => value.length > 0)
    );
  }

  addOrderItem() {
    this.store.dispatch(
      addNewOrderItem({ item: this.inventorySelectionControl.value })
    );
  }

  removeOrderItem(index: number) {
    this.store.dispatch(removeNewOrderItem({ index }));
  }

  openConfirmDialog() {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      width: '300px',
      data: {
        orderList: this.orderList,
        totalPrice: this.totalPrice,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(startSubmitOrder());
      }
    });
  }
}
