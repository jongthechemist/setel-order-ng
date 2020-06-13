import { createAction, props } from '@ngrx/store';
import { InventoryItem } from 'src/app/models/inventory.model';
import { InventoryEffects } from './inventory.effects';

export const setInventoryList = createAction(
  '[Inventory] List',
  props<{ items: InventoryItem[] }>()
);

export const LOAD_INVENTORY = '[Inventory] Load Inventory';
export const loadInventoryList = () => ({ type: LOAD_INVENTORY })