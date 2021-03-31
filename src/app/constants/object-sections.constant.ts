// tslint:disable: max-line-length
import { Section } from '@interfaces';
import {
  massCgFormGroupFactory,
  massInertiaFormGroupFactory,
  aeroGeneralFormGroupFactory,
  propGeneralFormGroupFactory,
  metaGeneralFormGroupFactory,
  initialGeneralFormGroupFactory,
  initialConditionsFormGroupFactory,
  scriptGeneralFormGroupFactory,
  aeroTableFormGroupFactory
} from './form-group-factory.constants';
import {
  BODYRATES_OPTIONS,
  ORIENTATION_OPTIONS,
  VELOCITY_OPTIONS,
  POSITION_OPTIONS
} from './init-cond-options.constants';

export const OBJECT_SECTIONS: () => Section[] = () => [
  {
    displayName: 'metadata',
    name: 'meta',
    icon: 'local_offer',
    subsections: [
      { displayName: 'general', name: 'general', icon: 'grade', form: metaGeneralFormGroupFactory(), route: 'meta_general', isDisabled: false }
    ],
    isDisabled: false
  },
  {
    displayName: 'mass properties',
    name: 'mass',
    icon: 'fitness_center',
    subsections: [
      { displayName: 'center of gravity', name: 'cg', icon: 'security', form: massCgFormGroupFactory(), route: 'mass_cg', isDisabled: false },
      { displayName: 'moments of inertia', name: 'inertia', icon: 'bubble_chart', form: massInertiaFormGroupFactory(), route: 'mass_inertia', isDisabled: false }
    ],
    isDisabled: true
  },
  {
    displayName: 'aerodynamics',
    name: 'aerodynamics',
    icon: 'flight',
    subsections: [
      { displayName: 'general', name: 'general', icon: 'grade', form: aeroGeneralFormGroupFactory(), route: 'aerodynamics_general', isDisabled: false },
      { displayName: 'body-fixed', name: 'bodyfixed', icon: 'border_all', form: aeroTableFormGroupFactory(), route: 'aerodynamics_bodyfixed', isDisabled: true },
      { displayName: 'axisymmetric', name: 'axisymmetric', icon: 'align_horizontal_center', form: aeroTableFormGroupFactory(), route: 'aerodynamics_axisymmetric', isDisabled: true },
      { displayName: 'wind', name: 'wind', icon: 'waves', form: aeroTableFormGroupFactory(), route: 'aerodynamics_wind', isDisabled: true }
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
      { displayName: 'general', name: 'general', icon: 'grade', form: initialGeneralFormGroupFactory(), route: 'initial_general', isDisabled: false },
      { displayName: 'position', name: 'position', icon: 'gps_fixed', form: initialConditionsFormGroupFactory(POSITION_OPTIONS[0].value), route: 'initial_position', isDisabled: false },
      { displayName: 'velocity', name: 'velocity', icon: 'double_arrow', form: initialConditionsFormGroupFactory(VELOCITY_OPTIONS[0].value), route: 'initial_velocity', isDisabled: false },
      { displayName: 'orientation', name: 'orientation', icon: 'widgets', form: initialConditionsFormGroupFactory(ORIENTATION_OPTIONS[0].value), route: 'initial_orientation', isDisabled: false },
      { displayName: 'body rates', name: 'bodyrates', icon: 'sync', form: initialConditionsFormGroupFactory(BODYRATES_OPTIONS[0].value), route: 'initial_bodyrates', isDisabled: false },
    ],
    isDisabled: false
  },
  {
    displayName: 'script',
    name: 'script',
    icon: 'code',
    subsections: [
      { displayName: 'general', name: 'general', icon: 'grade', form: scriptGeneralFormGroupFactory(), route: 'script_general', isDisabled: false }
    ],
    isDisabled: false
  }
];
