import { Section } from './section.interface';
import { ItemType } from '@enums';

export interface Item {
  id: number;
  name: string;
  type: ItemType;
  sections?: Section[];
  objects?: Item[];
  parentId?: number;
}
