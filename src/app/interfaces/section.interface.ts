import { Subsection } from './subsection.interface';

export interface Section {
  displayName: string;
  name: string;
  icon: string;
  subsections: Subsection[];
  isDisabled: boolean;
}
