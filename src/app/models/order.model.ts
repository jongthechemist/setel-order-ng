export type OrderStatus = 'CREATED' | 'CONFIRMED' | 'DELIVERED' | 'CANCELLED';
export interface OrderItemDto {
  itemId: string;
  price: number;
}

export interface CreateOrderDto {
  items: OrderItemDto[];
  createdDate: Date;
  createdBy: string;
  createdById: string;
}

export interface OrderStatusDto {
  status: OrderStatus;
  canPoll: boolean;
}

export interface OrderDto extends CreateOrderDto {
  uuid: string;
  status: OrderStatus;
}
