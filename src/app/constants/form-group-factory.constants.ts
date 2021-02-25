import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

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
    rows: new FormArray([])
  });
};

export const bodyGeneralFormGroupFactory: () => FormGroup = () => {
  return new FormGroup({
    body_rotation_on: new FormControl(false),
    body_model: new FormControl(null),
    rotation_rate: new FormControl('7.292115e-05'),
    equatorial_radius: new FormControl(null),
    eccentricity: new FormControl(null)
  });
};

export const windGeneralFormGroupFactory: () => FormGroup = () => {
  return new FormGroup({
    wind_on: new FormControl(false),
    wind_profile: new FormControl(null),
    rows: new FormArray([])
  });
};

export const epochGeneralFormGroupFactory: () => FormGroup = () => {
  return new FormGroup({
    epoch_on: new FormControl(false),
    epoch_date: new FormControl(null),
    epoch_time: new FormControl(null)
  });
};

export const metaGeneralFormGroupFactory: () => FormGroup = () => {
  return new FormGroup({
    parent_object: new FormControl('none'),
    solver: new FormControl(1),
    allow_six_dof: new FormControl(false),
    hold_down: new FormControl(false),
    local_environment: new FormControl(null, Validators.required)
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
    aero_mode: new FormControl(1),
    aero_ref_area: new FormControl(null),
    aero_ref_length: new FormControl(null),
    aero_moment_ref_x: new FormControl(null),
    aero_moment_ref_y: new FormControl(null),
    aero_moment_ref_z: new FormControl(null),
  });
};

export const aeroTableFormGroupFactory: () => FormGroup = () => {
  return new FormGroup({
    force_1: coefficientFormGroup(),
    force_2: coefficientFormGroup(),
    force_3: coefficientFormGroup(),
    moment_1: coefficientFormGroup(),
    moment_2: coefficientFormGroup(),
    moment_3: coefficientFormGroup(),
    moment_damping_1: coefficientFormGroup(),
    moment_damping_2: coefficientFormGroup(),
    moment_damping_3: coefficientFormGroup()
  });
};

const coefficientFormGroup: () => FormGroup = () => {
  return new FormGroup({
    size: new FormControl(null, Validators.required),
    table: new FormGroup({})
  });
};

export const twoDimTable: () => FormGroup = () => {
  return new FormGroup({
    row_dep: new FormControl(null),
    col_dep: new FormControl(null),
    columns: new FormArray([]),
    rows: new FormArray([]),
    data: new FormArray([])
  });
};

export const oneDimTable: () => FormGroup = () => {
  return new FormGroup({
    dep: new FormControl(null, Validators.required),
    rows: new FormArray([])
  });
};

export const propGeneralFormGroupFactory: () => FormGroup = () => {
  return new FormGroup({
    sources: new FormArray([])
  });
};

export const propSourceFormGroupFactory: (name?: string) => FormGroup = (name) => {
  return new FormGroup({
    name: new FormControl(name || 'source'),
    position_x: new FormControl(''),
    position_y: new FormControl(''),
    position_z: new FormControl(''),
    orientation_roll: new FormControl(''),
    orientation_pitch: new FormControl(''),
    orientation_yaw: new FormControl(''),
    nozzle_exit_area: new FormControl(''),
    mode: new FormControl(0),
    table_1: new FormArray([]),
    table_2: new FormArray([])
  });
};

export const initialGeneralFormGroupFactory: () => FormGroup = () => {
  return new FormGroup({
    time_sec: new FormControl(''),
    mass_kg: new FormControl(''),
    ground_range_m: new FormControl('')
  });
};

export const initialConditionsFormGroupFactory: () => FormGroup = () => {
  return new FormGroup({
    frame: new FormControl(''),
    value_1: new FormControl(''),
    value_2: new FormControl(''),
    value_3: new FormControl('')
  });
};

export const scriptGeneralFormGroupFactory: () => FormGroup = () => {
  return new FormGroup({
    segments: new FormArray([])
  });
};

export const segmentFormGroupFactory: (name?: string) => FormGroup = (name) => {
  return new FormGroup({
    name: new FormControl(name || 'segment'),
    dof: new FormControl('3+3'),
    print_dt: new FormControl(''),
    integration_dt: new FormControl(''),
    reset_user_time: new FormControl(false),
    reset_propulsion_time: new FormControl(false),
    active_propulsion_sources: new FormArray([]),
    gnc: new FormGroup({
      mode: new FormControl(''),
      frame: new FormControl(''),
      rows: new FormArray([]),
      value_1: new FormGroup({}), // Maybe don't need?
      value_2: new FormGroup({}), // Maybe don't need?
      value_3: new FormGroup({})  // Maybe don't need?
    }),
    parameter: new FormControl(''),
    condition: new FormControl(''),
    value: new FormControl('')
  });
};
