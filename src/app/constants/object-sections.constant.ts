import { Section } from '@interfaces';

export const OBJECT_SECTIONS: () => Section[] = () => [
  {
    name: 'mass properties',
    icon: 'fitness_center',
    subsections: [
      { name: 'center of gravity', icon: 'security', form: null, route: 'mass_cg' },
      { name: 'moments of inertia', icon: 'bubble_chart', form: null, route: 'mass_inertia' }
    ]
  },
  {
    name: 'aerodynamics',
    icon: 'flight',
    subsections: [
      { name: 'general', icon: 'grade', form: null, route: 'aerodynamics_general' },
      { name: 'axisymmetric', icon: 'align_horizontal_center', form: null, route: 'aerodynamics_axisymmetric' },
      { name: 'wind', icon: 'waves', form: null, route: 'aerodynamics_wind' },
      { name: 'body-fixed', icon: 'border_all', form: null, route: 'aerodynamics_bodyfixed' }
    ]
  },
  {
    name: 'propulsion',
    icon: 'local_fire_department',
    subsections: [
      { name: 'general', icon: 'grade', form: null, route: 'propulsion_general' }
    ]
  },
  {
    name: 'initial conditions',
    icon: 'waves',
    subsections: [
      { name: 'general', icon: 'grade', form: null, route: 'initial_general' },
      { name: 'position', icon: 'gps_fixed', form: null, route: 'initial_position' },
      { name: 'velocity', icon: 'double_arrow', form: null, route: 'initial_velocity' },
      { name: 'orientation', icon: 'widgets', form: null, route: 'initial_orientation' },
      { name: 'body rates', icon: 'sync', form: null, route: 'initial_bodyrates' },
    ]
  },
  {
    name: 'script',
    icon: 'code',
    subsections: [
      { name: 'general', icon: 'grade', form: null, route: 'script_general' }
    ]
  }
];
