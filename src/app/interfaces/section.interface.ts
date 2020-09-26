import { Subsection } from './subsection.interface';

export interface Section {
  name: string;
  icon: string;
  subsections: Subsection[];
}
