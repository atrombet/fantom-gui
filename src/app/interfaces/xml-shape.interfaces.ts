export interface SimulationShape {
  maximum_time_sec: string;
}

export interface EnvironmentShape {
  name: string;
  atmosphere: {
    enable: 0 | 1;
    mode: string;
  };
  gravity: {
    enable: 0 | 1;
    mode: string;
  };
  body: {
    rotation_enable: 0 | 1;
    mode: string;
  };
  wind: {
    enable: 0 | 1;
    mode: string;
  };
  epoch: {
    enable: 0 | 1;
    gregorian_date: {
      value: string;
    };
    utc: {
      value: string;
    };
  }
}

export interface EntityShape {
  name: string;
  object: ObjectShape[];
}
export interface ObjectShape {
  name: string;
  parent: string;
  hold_down: 0 | 1;
  local_environment: string;
  solver: string;
  initial_conditions: {
    time_sec: string;
    mass_kg: string;
    ground_range_m: string;
    position: {
      frame: string;
      value: string;
    };
    velocity: {
      frame: string;
      value: string;
    };
    euler_angles: {
      frame: string;
      value: string;
    };
    body_rates: {
      frame: string;
      value: string;
    };
  };
  properties: {
    mass_properties: {
      center_of_gravity_location_m: {
        x: { filename: string; };
        y: { filename: string; };
        z: { filename: string; };
      };
      moment_of_inertia_kg_m2: {
        ixx: { filename: string; };
        iyy: { filename: string; };
        izz: { filename: string; };
        ixy: { filename: string; };
        ixz: { filename: string; };
        iyz: { filename: string; };
      };
    };
    aerodynamics: {
      mode: string;
      reference: {
        area: string;
        length: string;
        moment_reference_location: string;
      };
      coefficients: {
        force_1: { filename: string; };
        force_2: { filename: string; };
        force_3: { filename: string; };
        moment_1: { filename: string; };
        moment_2: { filename: string; };
        moment_3: { filename: string; };
        moment_damping_1: { filename: string; };
        moment_damping_2: { filename: string; };
        moment_damping_3: { filename: string; };
      };
      coefficient_dependencies: {
        force_1: { dependency: string; };
        force_2: { dependency: string; };
        force_3: { dependency: string; };
        moment_1: { dependency: string; };
        moment_2: { dependency: string; };
        moment_3: { dependency: string; };
        moment_damping_1: { dependency: string; };
        moment_damping_2: { dependency: string; };
        moment_damping_3: { dependency: string; };
      };
    };
    propulsion: {
      n_hardware: string;
      hardware: HardwareShape[];
    };
  };
}

interface HardwareShape {
  name: string;
  mode: string;
  position: string;
  orientation_deg: string;
  nozzle_exit_area_m2: string;
  vaccum_thrust_N: { filename: string; };
  specific_impulse: { filename: string; };
  mass_flow_rate_kg_per_sec: { filename: string; };
}
