import { Item } from '@interfaces';

/**
 * Returns the XML for an environment's atmosphere settings.
 * @param env - The environment containing the section.
 */
export function getAtmoShapeFromEnv(env: Item): { enable: 0 | 1, mode: string } {
  const { atmosphere_on, atmospheric_model } = env.sections
    .find(sec => sec.name === 'atmosphere')
    .subsections
    .find(sub => sub.name === 'general')
    .form.value;
  return {
    enable: atmosphere_on ? 1 : 0,
    mode: atmospheric_model
  };
}

/**
 * Returns the XML for an environment's gravity settings.
 * @param env - The environment containing the section.
 */
export function getGravityShapeFromEnv(env: Item): { enable: 0 | 1, mode: string } {
  const { gravity_on, gravity_model } = env.sections
    .find(sec => sec.name === 'gravity')
    .subsections
    .find(sub => sub.name === 'general')
    .form.value;
  return {
    enable: gravity_on ? 1 : 0,
    mode: gravity_model
  };
}

/**
 * Returns the XML for an environment's body settings.
 * @param env - The environment containing the section.
 */
export function getBodyShapeFromEnv(env: Item): { rotation_enable: 0 | 1, mode: string } {
  const { body_rotation_on, body_model } = env.sections
    .find(sec => sec.name === 'body')
    .subsections
    .find(sub => sub.name === 'general')
    .form.value;
  return {
    rotation_enable: body_rotation_on ? 1 : 0,
    mode: body_model
  };
}

/**
 * Returns the XML for an environment's wind settings.
 * @param env - The environment containing the section.
 */
export function getWindShapeFromEnv(env: Item): { enable: 0 | 1, mode: string } {
  const { wind_on, wind_profile } = env.sections
    .find(sec => sec.name === 'wind')
    .subsections
    .find(sub => sub.name === 'general')
    .form.value;
  return {
    enable: wind_on ? 1 : 0,
    mode: wind_profile
  };
}

/**
 * Returns the XML for an environment's epoch settings.
 * @param env - The environment containing the section.
 */
export function getEpochShapeFromEnv(env: Item): {
  enable: 0 | 1,
  gregorian_date: {
    value: string
  },
  utc: {
    value: string;
  }
} {
  const { epoch_on, epoch_date, epoch_time } = env.sections
    .find(sec => sec.name === 'epoch')
    .subsections
    .find(sub => sub.name === 'general')
    .form.value;
  const date = epoch_date ? new Date(epoch_date) : null;
  return {
    enable: epoch_on ? 1 : 0,
    gregorian_date: {
      value: date ? `${date.getMonth()}, ${date.getDay()}, ${date.getFullYear()}` : null
    },
    utc: {
      value: epoch_time?.split(':').join(', ') || null
    }
  };
}
