import { Item, Section, Subsection } from '../interfaces';

export function flattenSections(item: Item): any {
  return {
    name: item.name,
    ...reduceSectionArrayToObject(item.sections)
  };
}

function reduceSectionArrayToObject(sections: Section[]): any {
  return sections.reduce((sectionsObj: any, section: Section) => {
    return {
      ...sectionsObj,
      [section.name]: {
        ...section.subsections.reduce((subObj: any, sub: Subsection) => {
          return { ...subObj, [sub.name]: sub.form.value };
        }, {})
      }
    };
  }, {});
}
