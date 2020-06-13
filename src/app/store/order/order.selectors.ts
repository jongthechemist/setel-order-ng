import { createSelector } from '@ngrx/store';
import { OrderState } from './order.reducer';
import { InventoryItem } from 'src/app/models/inventory.model';

export const orderListSelector = createSelector(
  (state: { order: OrderState; inventory: InventoryItem[] }) => state.order,
  (state: { inventory: InventoryItem[] }) => state.inventory,
  (orderState, inventoryState) => {
    return orderState.orderList.map((orderUuid) => {
      const order = orderState.orderDetails[orderUuid];
      if (!order) return null;
      return {
        ...order,
        items: order.items.map((orderItem) => ({
          ...orderItem,
          name: (
            inventoryState.find(
              (inventoryItem) => inventoryItem.uuid === orderItem.itemId
            ) || {}
          ).name,
        })),
        total: order.items
          .map((orderItem) => orderItem.price)
          .reduce((a, b) => a + b, 0),
      };
    });
  }
);

export const orderDetailsSelector = createSelector(
  (state: { order: OrderState; inventory: InventoryItem[] }, { orderUuid }) =>
    state.order.orderDetails[orderUuid],
  (state: { inventory: InventoryItem[] }) => state.inventory,
  (orderDetails, inventory) => {
    if (!orderDetails) return null;
    return {
      ...orderDetails,
      items: orderDetails.items.map((orderItem) => ({
        ...orderItem,
        name: (
          inventory.find(
            (inventoryItem) => inventoryItem.uuid === orderItem.itemId
          ) || {}
        ).name,
      })),
      total: orderDetails.items
        .map((orderItem) => orderItem.price)
        .reduce((a, b) => a + b, 0),
    };
  }
);

export const newOrderSelector = createSelector(
  (state: { order: OrderState }) => state.order,
  (orderState) => orderState.newOrder
);

export const orderSubmissionStatusSelector = createSelector(
  (state: { order: OrderState }) => state.order,
  (orderState) => orderState.submitOrderStatus
);

export const newOrderSelectorWithName = createSelector(
  (state: { order: OrderState; inventory: InventoryItem[] }) =>
    state.order.newOrder,
  (state: { inventory: InventoryItem[] }) => state.inventory,
  (newOrder, inventoryList) =>
    newOrder.map((orderItem) => ({
      itemId: orderItem.itemId,
      name: (
        inventoryList.find(
          (inventoryItem) => inventoryItem.uuid === orderItem.itemId
        ) || {}
      ).name,
      price: orderItem.price,
    }))
);

export const newOrderTotalPriceSelector = createSelector(
  (state: { order: OrderState }) => state.order,
  (orderState) =>
    orderState.newOrder
      .map((item) => item.price)
      .reduce((a, b) => (a + b) / 1.0, 0)
);
