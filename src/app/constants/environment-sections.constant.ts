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
    displayName: 'gravity',
    name: 'gravity',
    icon: 'nature_people',
    subsections: [
      { displayName: 'general', name: 'general', icon: 'grade', form: gravityGeneralFormGroupFactory(), route: 'gravity_general' }
    ]
  },
  {
    displayName: 'atmosphere',
    name: 'atmosphere',
    icon: 'public',
    subsections: [
      { displayName: 'general', name: 'general', icon: 'grade', form: atmosphereGeneralFormGroupFactory(), route: 'atmosphere_general' }
    ]
  },
  {
    displayName: 'body',
    name: 'body',
    icon: 'lens',
    subsections: [
      { displayName: 'general', name: 'general', icon: 'grade', form: bodyGeneralFormGroupFactory(), route: 'body_general' }
    ]
  },
  {
    displayName: 'wind',
    name: 'wind',
    icon: 'waves',
    subsections: [
      { displayName: 'general', name: 'general', icon: 'grade', form: windGeneralFormGroupFactory(), route: 'wind_general' }
    ]
  },
  {
    displayName: 'epoch',
    name: 'epoch',
    icon: 'schedule',
    subsections: [
      { displayName: 'general', name: 'general', icon: 'grade', form: epochGeneralFormGroupFactory(), route: 'epoch_general' }
    ]
  }
];
