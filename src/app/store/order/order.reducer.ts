import { createReducer, on } from '@ngrx/store';
import {
  addNewOrderItem,
  removeNewOrderItem,
  clearNewOrder,
  submitOrderSuccess,
  getOrderList,
  getOrderDetails,
  getOrderStatus,
  startSubmitOrder,
  startGetOrderList,
} from './order.action';
import {
  OrderItemDto,
  OrderDto,
  OrderStatus,
} from 'src/app/models/order.model';

export type FetchStatus = 'NEW' | 'SUBMITTING' | 'SUCCESS'

export interface OrderState {
  newOrder: OrderItemDto[];
  orderList: string[];
  orderDetails: { [key: string]: OrderDto };
  orderStatus: { [key: string]: OrderStatus };
  newOrderId: string;
  submitOrderStatus: FetchStatus;
  fetchOrderListStatus: FetchStatus;
}

const initialState: OrderState = {
  newOrder: [],
  orderList: [],
  orderDetails: {},
  orderStatus: {},
  newOrderId: '',
  fetchOrderListStatus: 'NEW',
  submitOrderStatus: 'NEW',
};

const _orderReducer = createReducer<OrderState>(
  initialState,
  on(addNewOrderItem, (state, action) => ({
    ...state,
    newOrder: [
      ...state.newOrder,
      { itemId: action.item.uuid, price: action.item.price },
    ],
  })),
  on(removeNewOrderItem, (state, action) => ({
    ...state,
    newOrder: state.newOrder.filter((item, index) => index !== action.index),
  })),
  on(clearNewOrder, (state) => ({
    ...state,
    newOrder: [],
    submitOrderStatus: 'NEW',
  })),
  on(startSubmitOrder, (state, action) => ({
    ...state,
    submitOrderStatus: 'SUBMITTING',
  })),
  on(submitOrderSuccess, (state, action) => ({
    ...state,
    newOrderId: action.order.uuid,
    submitOrderStatus: 'SUCCESS',
  })),
  on(startGetOrderList, (state, action) => ({
    ...state,
    fetchOrderListStatus: 'SUBMITTING',
  })),
  on(getOrderList, (state, action) => ({
    ...state,
    orderList: action.orders.map((item) => item.uuid),
    orderStatus: action.orders.reduce(
      (acc, item) => ({ ...acc, [item.uuid]: item.status }),
      {}
    ),
    orderDetails: action.orders.reduce(
      (acc, item) => ({ ...acc, [item.uuid]: item }),
      {}
    ),
    fetchOrderListStatus: 'SUCCESS',
  })),
  on(getOrderDetails, (state, action) => ({
    ...state,
    orderDetails: {
      ...state.orderDetails,
      [action.order.uuid]: action.order,
    },
    orderStatus: {
      ...state.orderStatus,
      [action.order.uuid]: action.order.status,
    },
  })),
  on(getOrderStatus, (state, action) => ({
    ...state,
    orderStatus: {
      ...state.orderStatus,
      [action.orderUuid]: action.status,
    },
  }))
);

export function orderReducer(state, action) {
  return _orderReducer(state, action);
}
