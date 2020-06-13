import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { InventoryItem } from 'src/app/models/inventory.model';

const MOCK_INVENTORY_API = 'https://run.mocky.io/v3/6adddc94-eab0-4053-bade-052ff85e3a27';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  constructor(private http: HttpClient) { }

  getInventory(): Observable<InventoryItem[]> {
    return this.http.get<InventoryItem[]>(MOCK_INVENTORY_API);
  }
}
