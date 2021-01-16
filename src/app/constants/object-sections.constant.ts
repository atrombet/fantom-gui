// tslint:disable: max-line-length
import { Section } from '@interfaces';
import {
  massCgFormGroupFactory,
  massInertiaFormGroupFactory,
  aeroGeneralFormGroupFactory,
  aero2DTableFormGroupFactory,
  propGeneralFormGroupFactory,
  metaGeneralFormGroupFactory,
  initialGeneralFormGroupFactory,
  initialConditionsFormGroupFactory,
  scriptGeneralFormGroupFactory
} from './form-group-factory.constants';

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
    isDisabled: false
  },
  {
    displayName: 'aerodynamics',
    name: 'aerodynamics',
    icon: 'flight',
    subsections: [
      { displayName: 'general', name: 'general', icon: 'grade', form: aeroGeneralFormGroupFactory(), route: 'aerodynamics_general', isDisabled: false },
      { displayName: 'axisymmetric', name: 'axisymmetric', icon: 'align_horizontal_center', form: aero2DTableFormGroupFactory(), route: 'aerodynamics_axisymmetric', isDisabled: true },
      { displayName: 'wind', name: 'wind', icon: 'waves', form: aero2DTableFormGroupFactory(), route: 'aerodynamics_wind', isDisabled: true },
      { displayName: 'body-fixed', name: 'bodyfixed', icon: 'border_all', form: aero2DTableFormGroupFactory(), route: 'aerodynamics_bodyfixed', isDisabled: true }
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
      { displayName: 'position', name: 'position', icon: 'gps_fixed', form: initialConditionsFormGroupFactory(), route: 'initial_position', isDisabled: false },
      { displayName: 'velocity', name: 'velocity', icon: 'double_arrow', form: initialConditionsFormGroupFactory(), route: 'initial_velocity', isDisabled: false },
      { displayName: 'orientation', name: 'orientation', icon: 'widgets', form: initialConditionsFormGroupFactory(), route: 'initial_orientation', isDisabled: false },
      { displayName: 'body rates', name: 'bodyrates', icon: 'sync', form: initialConditionsFormGroupFactory(), route: 'initial_bodyrates', isDisabled: false },
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
