import { FormGroup } from '@angular/forms';

export interface Subsection {
  name: string;
  icon: string;
  form: FormGroup;
  route: string;
}
