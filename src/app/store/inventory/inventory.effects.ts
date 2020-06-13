import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { InventoryService } from 'src/app/services/inventory/inventory.service';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { setInventoryList, LOAD_INVENTORY } from './inventory.action';

@Injectable()
export class InventoryEffects {
 
  loadMovies$ = createEffect(() => this.actions$.pipe(
    ofType(LOAD_INVENTORY),
    mergeMap(() => this.inventoryService.getInventory()
      .pipe(
        map(inventory => (setInventoryList({ items: inventory })),
        catchError(() => EMPTY)
      ))
    )
  ));
 
  constructor(
    private actions$: Actions,
    private inventoryService: InventoryService
  ) {}
}