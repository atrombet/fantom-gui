import { ItemType } from '@enums';

export interface NameChangeEvent {
  itemType: ItemType;
  itemId: number;
  name: string;
}
