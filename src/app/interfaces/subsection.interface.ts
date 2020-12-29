import { FormGroup } from '@angular/forms';

export interface Subsection {
  displayName: string;
  name: string;
  icon: string;
  form: FormGroup;
  route: string;
  isDisabled: boolean;
}
