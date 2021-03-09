import { ItemType } from '@enums';
import { Item } from '@interfaces';
import { OBJECT_SECTIONS } from '@constants';
import { binToBool, patchSubsectionForm } from '@functions';

interface InitCondFormValues {
  frame: string;
  value_1: string;
  value_2: string;
  value_3: string;
}

// tslint:disable: max-line-length
// tslint:disable: variable-name
export class EntityImporter {
  public lastObjectId = 0;

  constructor(public files: FileList) {}

  public createEntityItem(entity: any, id: number): Item {
    let objects = entity.object;
    if (!Array.isArray(objects)) {
      objects = [ objects ];
    }
    // Initialize the item.
    const entItem: Item = {
      id,
      name: entity.name._,
      type: ItemType.Entity,
      objects: objects.map(obj => {
        return this.createObjectItem(obj, id);
      })
    };

    return entItem;
  }

  public createObjectItem(obj: any, entityId: number): Item {
    this.lastObjectId = this.lastObjectId + 1;
    // Initialize the item.
    const objItem: Item =  {
      id: this.lastObjectId,
      name: obj.name._,
      type: ItemType.Object,
      sections: OBJECT_SECTIONS(),
      parentId: entityId
    };

    // Patch Meta General data
    patchSubsectionForm(objItem, 'meta', 'general', this.getMetaGeneralData(obj));
    // Patch mass property data if available
    // Patch Aero General data
    patchSubsectionForm(objItem, 'aerodynamics', 'general', this.getAeroGeneralData(obj));
    // Patch Aero page data
    // Patch prop source data
    // Patch initial condition data
    patchSubsectionForm(objItem, 'initial', 'general', this.getInitCondGeneralData(obj));
    patchSubsectionForm(objItem, 'initial', 'position', this.getInitCondData(obj, 'position'));
    patchSubsectionForm(objItem, 'initial', 'velocity', this.getInitCondData(obj, 'velocity'));
    patchSubsectionForm(objItem, 'initial', 'orientation', this.getInitCondData(obj, 'euler_angles'));
    patchSubsectionForm(objItem, 'initial', 'bodyrates', this.getInitCondData(obj, 'body_rates'));
    // Patch script/segment data.

    return objItem;
  }

  private getMetaGeneralData(obj: any): { parent_object, solver, hold_down, local_environment } {
    const { parent, solver, hold_down, local_environment } = obj;
    return {
      parent_object: parent._ === 'none' ? parent._ : Number(parent._),
      solver: Number(solver._),
      hold_down: binToBool(hold_down._),
      local_environment: Number(local_environment._)
    };
  }

  private getMassCgData() {}
  private getMassInertiaData() {}

  private getAeroGeneralData(obj: any): { aero_mode, aero_ref_area, aero_ref_length, aero_moment_ref_x, aero_moment_ref_y, aero_moment_ref_z } {
    const { mode, reference } = obj.aerodynamics;
    const { area, length, moment_reference_location } = reference;
    const [ x, y, z ] = moment_reference_location?._.split(',') || [ null, null, null ];
    return {
      aero_mode: Number(mode._),
      aero_ref_area: area._,
      aero_ref_length: length?._ || null,
      aero_moment_ref_x: x,
      aero_moment_ref_y: y,
      aero_moment_ref_z: z
    };
  }

  private getAeroPageData(obj: any) {}

  private getPropSourceData() {}

  private getInitCondGeneralData(obj: any): { time_sec, mass_kg, ground_range_m } {
    const { time_sec, mass_kg, ground_range_m } = obj.initial_conditions;
    return {
      time_sec: time_sec._,
      mass_kg: mass_kg._,
      ground_range_m: ground_range_m._
    };
  }

  private getInitCondData(obj: any, page: string): InitCondFormValues {
    const { frame, value } = obj.initial_conditions[page];
    const [ value_1, value_2, value_3 ] = value._.split(',').map(val => val.trim());
    return {
      frame: frame._,
      value_1,
      value_2,
      value_3
    };
  }


  private getScriptData() {}
  private getSegmentData() {}

}
