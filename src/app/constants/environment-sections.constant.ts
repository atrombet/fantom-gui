import { FormGroup } from '@angular/forms';
import { Section } from '../interfaces';

export const ENVIRONMENT_SECTIONS: Section[] = [
  {
    name: 'gravity',
    icon: 'nature_people',
    subsections: [
      { name: 'general', icon: 'grade', form: new FormGroup({}), route: 'gravity_general' }
    ]
  },
  {
    name: 'atmosphere',
    icon: 'public',
    subsections: [
      { name: 'general', icon: 'grade', form: new FormGroup({}), route: 'atmosphere_general' }
    ]
  },
  {
    name: 'body',
    icon: 'lens',
    subsections: [
      { name: 'general', icon: 'grade', form: new FormGroup({}), route: 'body_general' }
    ]
  },
  {
    name: 'wind',
    icon: 'waves',
    subsections: [
      { name: 'general', icon: 'grade', form: new FormGroup({}), route: 'wind_general' }
    ]
  },
  {
    name: 'epoch',
    icon: 'schedule',
    subsections: [
      { name: 'general', icon: 'grade', form: new FormGroup({}), route: 'epoch_general' }
    ]
  }
];
