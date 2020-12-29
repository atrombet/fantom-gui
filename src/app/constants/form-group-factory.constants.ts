import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { bodyShapeValidator } from '@validators';

export const gravityGeneralFormGroupFactory: () => FormGroup = () => {
  return new FormGroup({
    gravity_on: new FormControl(false),
    gravity_model: new FormControl(null)
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
    rotation_rate: new FormControl('7.292115e-05'),
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

export const massCgFormGroupFactory: () => FormGroup = () => {
  return new FormGroup({
    cg_dependency: new FormControl(null, Validators.required),
    rows: new FormArray([])
  });
};

export const massInertiaFormGroupFactory: () => FormGroup = () => {
  return new FormGroup({
    inertia_dependency: new FormControl(null, Validators.required),
    rows: new FormArray([])
  });
};

export const aeroGeneralFormGroupFactory: () => FormGroup = () => {
  return new FormGroup({
    aero_mode: new FormControl(null),
    aero_ref_area: new FormControl(null),
    aero_ref_length: new FormControl(null),
    aero_moment_ref_x: new FormControl(null),
    aero_moment_ref_y: new FormControl(null),
    aero_moment_ref_z: new FormControl(null),
  });
};

export const aero2DTableFormGroupFactory: () => FormGroup = () => {
  return new FormGroup({
    force1: twoDimTable(),
    force2: twoDimTable(),
    force3: twoDimTable(),
    moment1: twoDimTable(),
    moment2: twoDimTable(),
    moment3: twoDimTable(),
    damping1: twoDimTable(),
    damping2: twoDimTable(),
    damping3: twoDimTable()
  });
};

const twoDimTable: () => FormGroup = () => {
  return new FormGroup({
    row_dep: new FormControl(null),
    col_dep: new FormControl(null),
    columns: new FormArray([]),
    rows: new FormArray([]),
    data: new FormArray([])
  })
}