export interface FileName {
  filename: string;
}

export interface Dependency {
  dependency: string;
}

export interface CGProps {
  cg_dependency: number;
  rows: {
    dep: string;
    x: string;
    y: string;
    z: string;
  }[];
}

export interface CGFileNames {
  x: FileName;
  y: FileName;
  z: FileName;
}

export interface MomentProps {
  inertia_dependency: number;
  rows: {
    dep: string;
    ixx: string;
    iyy: string;
    izz: string;
    ixy: string;
    ixz: string;
    iyz: string;
  }[];
}

export interface MomentFileNames {
  ixx: FileName;
  iyy: FileName;
  izz: FileName;
  ixy: FileName;
  ixz: FileName;
  iyz: FileName;
}

export interface CoefficientFileNames {
  force_1: FileName;
  force_2: FileName;
  force_3: FileName;
  moment_1: FileName;
  moment_2: FileName;
  moment_3: FileName;
  moment_damping_1: FileName;
  moment_damping_2: FileName;
  moment_damping_3: FileName;
}

export interface CoefficientDependencies {
  force_1: Dependency;
  force_2: Dependency;
  force_3: Dependency;
  moment_1: Dependency;
  moment_2: Dependency;
  moment_3: Dependency;
  moment_damping_1: Dependency;
  moment_damping_2: Dependency;
  moment_damping_3: Dependency;
}

export interface PropTableFileNames {
  vaccum_thrust_N?: FileName;
  specific_impulse?: FileName;
  mass_flow_rate_kg_per_sec?: FileName;
}

export interface GncTableFileNames {
  value_1: FileName;
  value_2: FileName;
  value_3: FileName;
}
