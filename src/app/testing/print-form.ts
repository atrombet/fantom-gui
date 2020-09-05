import { FormGroup } from '@angular/forms';

export const printForm: (form: FormGroup) => void = (form) => {
  alert(JSON.stringify(form.value, null, '\t'));
};
