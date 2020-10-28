import { FormGroup, FormControl } from '@angular/forms';
import { bodyShapeValidator } from '@validators';

export const gravityGeneralFormGroupFactory: () => FormGroup = () => {
  return new FormGroup({
    gravity_on: new FormControl(false),
    gravity_model: new FormControl(null),
    custom_gravity_file_path: new FormControl(null)
  });
};

export const atmosphereGeneralFormGroupFactory: () => FormGroup = () => {
  return new FormGroup({
    atmosphere_on: new FormControl(false),
    atmospheric_model: new FormControl(null),
    custom_atmosphere_file_path: new FormControl(null)
  });
};

export const bodyGeneralFormGroupFactory: () => FormGroup = () => {
  return new FormGroup({
    body_rotation_on: new FormControl(false),
    body_model: new FormControl(null),
    rotation_rate: new FormControl(null),
    equatorial_radius: new FormControl(null),
    polar_radius: new FormControl(null),
    eccentricity: new FormControl(null)
  }, [ bodyShapeValidator ]);
};

export const windGeneralFormGroupFactory: () => FormGroup = () => {
  return new FormGroup({
    wind_on: new FormControl(false),
    wind_profile: new FormControl(null),
    custom_wind_file_path: new FormControl(null)
  });
};

export const epochGeneralFormGroupFactory: () => FormGroup = () => {
  return new FormGroup({
    epoch_on: new FormControl(false),
    epoch_date: new FormControl(null),
    epoch_time: new FormControl(null)
  });
};
