// tslint:disable: max-line-length
import { Section } from '@interfaces';
import {
  massCgFormGroupFactory,
  massInertiaFormGroupFactory,
  aeroGeneralFormGroupFactory,
  aero2DTableFormGroupFactory,
  propGeneralFormGroupFactory
} from './form-group-factory.constants';

export const OBJECT_SECTIONS: () => Section[] = () => [
  {
    displayName: 'mass properties',
    name: 'mass',
    icon: 'fitness_center',
    subsections: [
      { displayName: 'center of gravity', name: 'cg', icon: 'security', form: massCgFormGroupFactory(), route: 'mass_cg', isDisabled: false },
      { displayName: 'moments of inertia', name: 'inertia', icon: 'bubble_chart', form: massInertiaFormGroupFactory(), route: 'mass_inertia', isDisabled: false }
    ],
    isDisabled: false
  },
  {
    displayName: 'aerodynamics',
    name: 'aerodynamics',
    icon: 'flight',
    subsections: [
      { displayName: 'general', name: 'general', icon: 'grade', form: aeroGeneralFormGroupFactory(), route: 'aerodynamics_general', isDisabled: false },
      { displayName: 'axisymmetric', name: 'axisymmetric', icon: 'align_horizontal_center', form: aero2DTableFormGroupFactory(), route: 'aerodynamics_axisymmetric', isDisabled: false },
      { displayName: 'wind', name: 'wind', icon: 'waves', form: aero2DTableFormGroupFactory(), route: 'aerodynamics_wind', isDisabled: false },
      { displayName: 'body-fixed', name: 'bodyfixed', icon: 'border_all', form: aero2DTableFormGroupFactory(), route: 'aerodynamics_bodyfixed', isDisabled: false }
    ],
    isDisabled: false
  },
  {
    displayName: 'propulsion',
    name: 'propulsion',
    icon: 'local_fire_department',
    subsections: [
      { displayName: 'general', name: 'general', icon: 'grade', form: propGeneralFormGroupFactory(), route: 'propulsion_general', isDisabled: false }
    ],
    isDisabled: false
  },
  {
    displayName: 'initial conditions',
    name: 'initial',
    icon: 'circle',
    subsections: [
      { displayName: 'general', name: 'general', icon: 'grade', form: null, route: 'initial_general', isDisabled: false },
      { displayName: 'position', name: 'position', icon: 'gps_fixed', form: null, route: 'initial_position', isDisabled: false },
      { displayName: 'velocity', name: 'velocity', icon: 'double_arrow', form: null, route: 'initial_velocity', isDisabled: false },
      { displayName: 'orientation', name: 'orientation', icon: 'widgets', form: null, route: 'initial_orientation', isDisabled: false },
      { displayName: 'body rates', name: 'bodyrates', icon: 'sync', form: null, route: 'initial_bodyrates', isDisabled: false },
    ],
    isDisabled: false
  },
  {
    displayName: 'script',
    name: 'script',
    icon: 'code',
    subsections: [
      { displayName: 'general', name: 'general', icon: 'grade', form: null, route: 'script_general', isDisabled: false }
    ],
    isDisabled: false
  }
];
