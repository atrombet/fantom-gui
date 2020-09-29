import { Section } from '../interfaces';
import {
  gravityGeneralFormGroupFactory,
  atmosphereGeneralFormGroupFactory,
  bodyGeneralFormGroupFactory,
  windGeneralFormGroupFactory,
  epochGeneralFormGroupFactory
} from './form-group-factory.constants';


export const ENVIRONMENT_SECTIONS: () => Section[] = () => [
  {
    name: 'gravity',
    icon: 'nature_people',
    subsections: [
      { name: 'general', icon: 'grade', form: gravityGeneralFormGroupFactory(), route: 'gravity_general' }
    ]
  },
  {
    name: 'atmosphere',
    icon: 'public',
    subsections: [
      { name: 'general', icon: 'grade', form: atmosphereGeneralFormGroupFactory(), route: 'atmosphere_general' }
    ]
  },
  {
    name: 'body',
    icon: 'lens',
    subsections: [
      { name: 'general', icon: 'grade', form: bodyGeneralFormGroupFactory(), route: 'body_general' }
    ]
  },
  {
    name: 'wind',
    icon: 'waves',
    subsections: [
      { name: 'general', icon: 'grade', form: windGeneralFormGroupFactory(), route: 'wind_general' }
    ]
  },
  {
    name: 'epoch',
    icon: 'schedule',
    subsections: [
      { name: 'general', icon: 'grade', form: epochGeneralFormGroupFactory(), route: 'epoch_general' }
    ]
  }
];
