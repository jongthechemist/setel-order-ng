import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { OrderState } from 'src/app/store/order/order.reducer';
import { Observable } from 'rxjs';
import { OrderStatus } from 'src/app/models/order.model';
import { pollOrderStatus } from 'src/app/store/order/order.action';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
})
export class StatusComponent implements OnInit {
  @Input() orderUuid: string;
  status: Observable<OrderStatus>;

  constructor(private store: Store<{ order: OrderState }>) {
    this.status = store.select(
      ({ order }) => order.orderStatus[this.orderUuid]
    );
  }

  ngOnInit(): void {}

  getColor(): Observable<string> {
    return this.status.pipe(
      map(
        (status) =>
          ({
            CREATED: '',
            CONFIRMED: 'primary',
            DELIVERED: 'accent',
            CANCELLED: 'warn',
          }[status])
      )
    );
  }
}
