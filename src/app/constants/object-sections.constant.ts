import { Section } from '@interfaces';
import { massCgFormGroupFactory, massInertiaFormGroupFactory } from './form-group-factory.constants';

export const OBJECT_SECTIONS: () => Section[] = () => [
  {
    displayName: 'mass properties',
    name: 'mass',
    icon: 'fitness_center',
    subsections: [
      { displayName: 'center of gravity', name: 'cg', icon: 'security', form: massCgFormGroupFactory(), route: 'mass_cg' },
      { displayName: 'moments of inertia', name: 'inertia', icon: 'bubble_chart', form: massInertiaFormGroupFactory(), route: 'mass_inertia' }
    ]
  },
  {
    displayName: 'aerodynamics',
    name: 'aerodynamics',
    icon: 'flight',
    subsections: [
      { displayName: 'general', name: 'general', icon: 'grade', form: null, route: 'aerodynamics_general' },
      // tslint:disable-next-line: max-line-length
      { displayName: 'axisymmetric', name: 'axisymmetric', icon: 'align_horizontal_center', form: null, route: 'aerodynamics_axisymmetric' },
      { displayName: 'wind', name: 'wind', icon: 'waves', form: null, route: 'aerodynamics_wind' },
      { displayName: 'body-fixed', name: 'body-fixed', icon: 'border_all', form: null, route: 'aerodynamics_bodyfixed' }
    ]
  },
  {
    displayName: 'propulsion',
    name: 'propulsion',
    icon: 'local_fire_department',
    subsections: [
      { displayName: 'general', name: 'general', icon: 'grade', form: null, route: 'propulsion_general' }
    ]
  },
  {
    displayName: 'initial conditions',
    name: 'initial',
    icon: 'circle',
    subsections: [
      { displayName: 'general', name: 'general', icon: 'grade', form: null, route: 'initial_general' },
      { displayName: 'position', name: 'position', icon: 'gps_fixed', form: null, route: 'initial_position' },
      { displayName: 'velocity', name: 'velocity', icon: 'double_arrow', form: null, route: 'initial_velocity' },
      { displayName: 'orientation', name: 'orientation', icon: 'widgets', form: null, route: 'initial_orientation' },
      { displayName: 'body rates', name: 'bodyrates', icon: 'sync', form: null, route: 'initial_bodyrates' },
    ]
  },
  {
    displayName: 'script',
    name: 'script',
    icon: 'code',
    subsections: [
      { displayName: 'general', name: 'general', icon: 'grade', form: null, route: 'script_general' }
    ]
  }
];
