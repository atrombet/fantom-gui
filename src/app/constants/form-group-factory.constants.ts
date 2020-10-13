import { FormGroup, FormControl } from '@angular/forms';

export const gravityGeneralFormGroupFactory: () => FormGroup = () => {
  return new FormGroup({
    gravity_on: new FormControl(false),
    gravity_model: new FormControl(null),
    custom_gravity: new FormControl(null)
  });
};

export const atmosphereGeneralFormGroupFactory: () => FormGroup = () => {
  return new FormGroup({});
};

export const bodyGeneralFormGroupFactory: () => FormGroup = () => {
  return new FormGroup({});
};

export const windGeneralFormGroupFactory: () => FormGroup = () => {
  return new FormGroup({});
};

export const epochGeneralFormGroupFactory: () => FormGroup = () => {
  return new FormGroup({
    epoch_on: new FormControl(false),
    epoch_date: new FormControl(null),
    epoch_time: new FormControl(null)
  });
};
