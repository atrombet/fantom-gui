import { ItemType } from '@enums';
import { Item } from '@interfaces';
import { ENVIRONMENT_SECTIONS, OBJECT_SECTIONS } from '../constants';
import { binToBool, boolToBin } from './bin-bool-helpers';

export const verifyXmlImport = (files: FileList): boolean => {
  // Check all files are XML
  const xmlFileType = Object.keys(files).map(key => files[key].type).every(filetype => filetype === 'text/xml');

  return xmlFileType;
};

/**
 * Patches the given value into the specified subsection's form.
 * @param item - The item.
 * @param section - The section containing the subsection.
 * @param subsection - The subsection containing the form.
 * @param value - the value to patch to the form group.
 */
export function patchSubsectionForm(item: Item, section: string, subsection: string, value: any): void {
  const form = item
    .sections
    .find(sec => sec.name === section)
    .subsections
    .find(subsec => subsec.name === subsection)
    .form;
  form.patchValue(value);
}

/**********************************
 * ENVIRONMENT
 **********************************/

export const createEnvItem = (env: any, id: number): Item => {
  // Initialize the item.
  const envItem: Item =  {
    id,
    name: env.name._,
    type: ItemType.Environment,
    sections: ENVIRONMENT_SECTIONS()
  };

  // Patch gravity data.
  patchSubsectionForm(envItem, 'gravity', 'general', getGravData(env));
  // Patch atmo data.
  patchSubsectionForm(envItem, 'atmosphere', 'general', getAtmoData(env));
  // Patch body data
  patchSubsectionForm(envItem, 'body', 'general', getBodyData(env));
  // Patch wind data
  patchSubsectionForm(envItem, 'wind', 'general', getWindData(env));
  // Patch epoch data
  patchSubsectionForm(envItem, 'epoch', 'general', getEpochData(env));

  return envItem;
};

function getGravData(env: any): { gravity_on, gravity_model } {
  const { enable, mode } = env.gravity;
  return {
    gravity_on: binToBool(enable._),
    gravity_model: Number(mode._)
  };
}

function getAtmoData(env: any): { atmosphere_on, atmospheric_model, rows } {
  // TODO: import row data.
  const { enable, mode, rows } = env.atmosphere;
  return {
    atmosphere_on: binToBool(enable._),
    atmospheric_model: Number(mode._),
    rows: rows || [],
  };
}

function getBodyData(env: any): { body_rotation_on, body_model, rotation_rate?, equatorial_radius?, eccentricity? } {
  const { rotation_enable, mode } = env.body;
  return {
    body_rotation_on: binToBool(rotation_enable._),
    body_model: Number(mode._)
  };
}

function getWindData(env: any): { wind_on, wind_profile, rows } {
  // TODO: import row data.
  const { enable, mode, rows } = env.wind;
  return {
    wind_on: binToBool(enable._),
    wind_profile: Number(mode._),
    rows: rows || [],
  };
}

function getEpochData(env): { epoch_on, epoch_date, epoch_time } {
  const { enable, gregorian_date, utc } = env.epoch;
  return {
    epoch_on: boolToBin(enable._),
    epoch_date: new Date(gregorian_date.value._),
    epoch_time: utc.value._.split(',').map(_ => _.trim()).join(':')
  };
}
