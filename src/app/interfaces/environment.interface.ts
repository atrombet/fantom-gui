import { Section } from './section.interface';

export interface Environment {
  id: number;
  name: string;
  sections?: Section[];
}
