import { createSelector } from '@ngrx/store';
import { InventoryItem } from 'src/app/models/inventory.model';

export const inventoryListSelector = createSelector(
  (state: { inventory: InventoryItem[] }) => state.inventory,
  (inventoryState) => inventoryState
);
