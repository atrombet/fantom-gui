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
