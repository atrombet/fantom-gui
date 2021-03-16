export interface GravityFormValues {
  gravity_on: boolean;
  gravity_model: number;
}

export interface AtmoFormValues {
  atmosphere_on: boolean;
  atmospheric_model: number;
  rows: any[];
}

export interface BodyFormValues {
  body_rotation_on: boolean;
  body_model: number;
  rotation_rate_rad_per_sec?: string;
  equatorial_radius_m?: string;
  eccentricity?: string;
  sea_level_gravitational_acceleration_m_per_s2?: string;
  gravitational_parameter_m3_per_sec2?: string;
}

export interface WindFormValues {
  wind_on: boolean;
  wind_profile: number;
  rows: any[];
}

export interface EpochFormValues {
  epoch_on: boolean;
  epoch_date: Date;
  epoch_time: string;
}
