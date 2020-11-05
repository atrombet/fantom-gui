import { BehaviorSubject } from 'rxjs';
import { ItemType } from '../enums';
import { Item } from './item.interface';

export interface AppState {
  [ItemType.Environment]: ItemState;
  [ItemType.Entity]: ItemState;
  [ItemType.Object]: ItemState;
}

export interface ItemState {
  data: BehaviorSubject<Map<number, Item>>;
  lastId: number;
}
