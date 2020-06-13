import { createAction, props } from '@ngrx/store';
import { InventoryItem } from 'src/app/models/inventory.model';
import {
  OrderDto,
  OrderStatus,
  CreateOrderDto,
} from 'src/app/models/order.model';

export const addNewOrderItem = createAction(
  '[New Order] Add',
  props<{ item: InventoryItem }>()
);

export const removeNewOrderItem = createAction(
  '[New Order] Remove',
  props<{ index: number }>()
);
export const clearNewOrder = createAction('[New Order] Clear');

export const startSubmitOrder = createAction('[New Order] Start Submit');
export const submitOrderSuccess = createAction(
  '[New Order] Submit Success',
  props<{ order: OrderDto }>()
);

export const startGetOrderList = createAction('[Order] Start Get List');
export const getOrderList = createAction(
  '[Order] Get List',
  props<{ orders: OrderDto[] }>()
);

export const startGetOrderDetails = createAction(
  '[Order] Start Get Details',
  props<{ orderUuid: string }>()
);
export const getOrderDetails = createAction(
  '[Order] Get Details',
  props<{ order: OrderDto }>()
);

export const pollOrderStatus = createAction(
  '[Order] Poll Status',
  props<{ orderUuid: string }>()
);
export const getOrderStatus = createAction(
  '[Order] Get Status',
  props<{ orderUuid: string; status: OrderStatus }>()
);

export const cancelOrder = createAction(
  '[Order] Cancel',
  props<{ orderUuid: string }>()
);
