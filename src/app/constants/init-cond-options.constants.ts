import { SelectOption } from '@interfaces';

export const BODYRATES_OPTIONS: SelectOption[] = [
  { value: 'ecef', viewValue: 'ECEF' }
];

export const ORIENTATION_OPTIONS: SelectOption[] = [
  { value: 'eci', viewValue: 'ECI' },
  { value: 'ecef', viewValue: 'ECEF' },
  { value: 'ned', viewValue: 'NED' }
];

export const VELOCITY_OPTIONS: SelectOption[] = [
  { value: 'eci', viewValue: 'ECI' },
  { value: 'ecef', viewValue: 'ECEF' }
];

export const POSITION_OPTIONS: SelectOption[] = [
  { value: 'eci', viewValue: 'ECI' },
  { value: 'ecef', viewValue: 'ECEF' },
  { value: 'geodetic', viewValue: 'Geodetic' }
];
