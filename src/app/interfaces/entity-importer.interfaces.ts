export interface InitCondFormValues {
  frame: string;
  value_1: string;
  value_2: string;
  value_3: string;
}

export interface CoefficientFormValues {
  size: number;
  table_1d: Table1D;
  table_2D: Table2D;
}

export interface Table1D {
  dep: number;
  rows: any[];
}

export interface Table2D {
  row_dep: number;
  col_dep: number;
  columns: any[];
  rows: any[];
  data: any[];
}

export interface PropSourceFormValues {
  name: string;
  position_x: string;
  position_y: string;
  position_z: string;
  orientation_roll: string;
  orientation_pitch: string;
  orientation_yaw: string;
  nozzle_exit_area: string;
  mode: number;
  table_1?: any[];
  table_2?: any[];
}

export interface CgFormValues {
  cg_dependency: number;
  rows: any[];
}

export interface MoiFormValues {
  inertia_dependency: number;
  rows: any[];
}

export interface SegmentFormValues {
  name: string;
  dof: string;
  print_dt: string;
  integration_dt: string;
  reset_user_time: boolean;
  reset_propulsion_time: boolean;
  active_propulsion_sources: any;
  gnc: {
    mode: number;
    frame: number;
    rows: any[];
  };
  parameter: number;
  condition: number;
  value: string;
}
