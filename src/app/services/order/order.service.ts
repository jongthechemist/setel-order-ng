import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  CreateOrderDto,
  OrderDto,
  OrderStatusDto,
} from 'src/app/models/order.model';
import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  getOrders(): Observable<OrderDto[]> {
    return this.http.get('/orders') as Observable<OrderDto[]>;
  }

  getOrderDetails(orderUuid: string): Observable<OrderDto> {
    return this.http.get(`/order/${orderUuid}`) as Observable<OrderDto>;
  }

  getOrderStatus(
    orderUuid: string,
    polling: boolean = false
  ): Observable<OrderStatusDto> {
    return this.http.get(`/order/${orderUuid}/status`, {
      params: { polling: String(polling) },
    }) as Observable<OrderStatusDto>;
  }

  submitOrder(order: CreateOrderDto): Observable<OrderDto> {
    return this.http.post('/order', order) as Observable<OrderDto>;
  }

  cancelOrder(orderUuid: string): Observable<OrderDto> {
    return this.http.put(`/order/${orderUuid}/cancel`, {}) as Observable<OrderDto>;
  }
}
