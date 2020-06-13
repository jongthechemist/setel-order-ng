import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { OrderService } from 'src/app/services/order/order.service';
import {
  map,
  catchError,
  exhaustMap,
  concatMap,
  withLatestFrom,
  switchMap,
  mergeMap,
} from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';
import {
  submitOrderSuccess,
  startSubmitOrder,
  startGetOrderList,
  getOrderList,
  pollOrderStatus,
  getOrderStatus,
  startGetOrderDetails,
  getOrderDetails,
  cancelOrder,
} from './order.action';
import { Store, select } from '@ngrx/store';
import { OrderState } from './order.reducer';
import { newOrderSelector } from './order.selectors';
import { TypedAction } from '@ngrx/store/src/models';

@Injectable()
export class OrderEffects {
  submitOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(startSubmitOrder),
      concatMap((action) =>
        of(action).pipe(
          withLatestFrom(this.store.pipe(select(newOrderSelector)))
        )
      ),
      exhaustMap(([_action, orderItems]) => {
        return this.orderService
          .submitOrder({
            createdBy: '',
            createdById: '',
            createdDate: new Date(),
            items: orderItems,
          })
          .pipe(
            switchMap((order) => [
              submitOrderSuccess({ order }),
              pollOrderStatus({ orderUuid: order.uuid }),
            ]),
            catchError(() => EMPTY)
          );
      })
    )
  );

  getOrderList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(startGetOrderList),
      concatMap(() => {
        return this.orderService.getOrders().pipe(
          map(
            (orders) => getOrderList({ orders }),
            catchError(() => EMPTY)
          )
        );
      })
    )
  );

  startGetOrderDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(startGetOrderDetails),
      concatMap(({ orderUuid }) => {
        return this.orderService.getOrderDetails(orderUuid).pipe(
          map(
            (order) => getOrderDetails({ order }),
            catchError(() => EMPTY)
          )
        );
      })
    )
  );

  pollOrderStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(pollOrderStatus),
      mergeMap(({ orderUuid }) => {
        return this.orderService.getOrderStatus(orderUuid, true).pipe(
          switchMap((response) => {
            const actions: TypedAction<any>[] = [
              getOrderStatus({ orderUuid, status: response.status }),
            ];
            if (response.canPoll) actions.push(pollOrderStatus({ orderUuid }));
            return actions;
          }),
          catchError(() => EMPTY)
        );
      })
    )
  );

  cancelOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cancelOrder),
      concatMap(({ orderUuid }) => {
        return this.orderService
          .cancelOrder(orderUuid)
          .pipe(
            switchMap((order) => [
              getOrderDetails({ order }),
              pollOrderStatus({ orderUuid }),
            ])
          );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private orderService: OrderService,
    private store: Store<{ order: OrderState }>
  ) {}
}
