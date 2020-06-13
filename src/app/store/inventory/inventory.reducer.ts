import { createReducer, on } from '@ngrx/store';
import { InventoryItem } from 'src/app/models/inventory.model';
import { setInventoryList } from './inventory.action';

const initialState: InventoryItem[] = [];
const _inventoryReducer = createReducer<InventoryItem[]>(
  initialState,
  on(setInventoryList, (_state, action) => {
    return action.items;
  })
);

export function inventoryReducer(state, action) {
  return _inventoryReducer(state, action);
}
