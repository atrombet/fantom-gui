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
  rotation_rate?: string;
  equatorial_radius?: string;
  eccentricity?: string;
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
