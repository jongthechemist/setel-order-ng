import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { OrderItemDto } from 'src/app/models/order.model';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
})
export class ConfirmModalComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      orderList: Observable<OrderItemDto[]>;
      totalPrice: Observable<number>;
      getInventoryItemName: (uuid: string) => Observable<string>;
    }
  ) {}

  ngOnInit(): void {}
}
