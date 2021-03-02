export interface XmlFile {
  filepath: string;
  content: string;
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

export interface CGFiles {
  x: XmlFile;
  y: XmlFile;
  z: XmlFile;
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

export interface MomentFiles {
  ixx: XmlFile;
  iyy: XmlFile;
  izz: XmlFile;
  ixy: XmlFile;
  ixz: XmlFile;
  iyz: XmlFile;
}

export interface CoefficientFiles {
  force_1: XmlFile;
  force_2: XmlFile;
  force_3: XmlFile;
  moment_1?: XmlFile;
  moment_2?: XmlFile;
  moment_3?: XmlFile;
  moment_damping_1?: XmlFile;
  moment_damping_2?: XmlFile;
  moment_damping_3?: XmlFile;
}

export interface CoefficientDependencies {
  force_1: Dependency;
  force_2: Dependency;
  force_3: Dependency;
  moment_1?: Dependency;
  moment_2?: Dependency;
  moment_3?: Dependency;
  moment_damping_1?: Dependency;
  moment_damping_2?: Dependency;
  moment_damping_3?: Dependency;
}

export interface PropTableFiles {
  vaccum_thrust_N?: XmlFile;
  specific_impulse?: XmlFile;
  mass_flow_rate_kg_per_sec?: XmlFile;
}

export interface GncTableFiles {
  value_1: XmlFile;
  value_2: XmlFile;
  value_3: XmlFile;
}
