import { ItemType } from '@enums';
import { CgFormValues, CoefficientFormValues, Item, MoiFormValues, PropSourceFormValues, SegmentFormValues, Table1D, Table2D } from '@interfaces';
import { OBJECT_SECTIONS, propSourceFormGroupFactory, segmentFormGroupFactory } from '@constants';
import { binToBool, patchSubsectionForm } from '@functions';
import { BaseImporter } from './base-importer';
import { forkJoin, Observable, of, zip } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { InitCondFormValues } from '@interfaces';
import { FormArray, FormControl, FormGroup } from '@angular/forms';


// tslint:disable: no-shadowed-variable
export class EntityImporter extends BaseImporter {
  public lastObjectId = 0;

  constructor(public files: FileList) {
    super(files);
  }

  /*********************************
   * Entity and Object Methods
   *********************************/

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
    // Patch Aero General data
    patchSubsectionForm(objItem, 'aerodynamics', 'general', this.getAeroGeneralData(obj));

    // Determine aero page subsection from aero mode.
    let aeroSubsection;
    switch (Number(obj.properties.aerodynamics.mode._)) {
      case 0: aeroSubsection = 'bodyfixed'; break;
      case 1: aeroSubsection = 'axisymmetric'; break;
      case 2: aeroSubsection = 'wind'; break;
    }


    // Patch initial condition data
    patchSubsectionForm(objItem, 'initial', 'general', this.getInitCondGeneralData(obj));
    patchSubsectionForm(objItem, 'initial', 'position', this.getInitCondData(obj, 'position'));
    patchSubsectionForm(objItem, 'initial', 'velocity', this.getInitCondData(obj, 'velocity'));
    patchSubsectionForm(objItem, 'initial', 'orientation', this.getInitCondData(obj, 'euler_angles'));
    patchSubsectionForm(objItem, 'initial', 'bodyrates', this.getInitCondData(obj, 'body_rates'));
    // Patch script/segment data.

    // Patch sections that require file import.
    forkJoin({
      cg: this.getMassCgData(obj),
      moi: this.getMassInertiaData(obj),
      aeroPage: this.getAeroPageData(obj),
      propSources: this.getPropSourceData(obj),
      segments: this.getScriptData(obj)
    }).pipe(
      tap(({ cg, moi, aeroPage, propSources, segments }) => {
        // Mass Property Data
        if (!!cg) this.patchMassPropForm(objItem, 'cg', cg as unknown as any[]);
        if (!!moi) this.patchMassPropForm(objItem, 'inertia', moi as unknown as any[]);
        // Aero Page
        this.patchAeroPageForm(objItem, aeroSubsection, aeroPage);
        // Prop Sources
        this.patchPropSourceData(objItem, propSources);
        // Script/Segments
        this.patchSegmentData(objItem, segments);
      })
    ).subscribe();

    return objItem;
  }

  /*********************************
   * Metadata
   *********************************/

  private getMetaGeneralData(obj: any): { parent_object, solver, hold_down, local_environment, allow_six_dof } {
    const { parent, solver, hold_down, local_environment } = obj;
    return {
      parent_object: parent._ === 'none' ? parent._ : Number(parent._),
      solver: Number(solver._),
      hold_down: binToBool(hold_down._),
      local_environment: local_environment._,
      allow_six_dof: obj.properties.mass_properties
    };
  }

  /*********************************
   * Mass Properties
   *********************************/

  private getMassCgData(obj: any): Observable<CgFormValues | boolean> {
    if (obj.properties.mass_properties) {
      const { x, y, z } = obj.properties.mass_properties.center_of_gravity_location_m;
      return forkJoin({
        x: this.importTableFromFile(x.filename._),
        y: this.importTableFromFile(y.filename._),
        z: this.importTableFromFile(z.filename._)
      }).pipe(
        map(({x, y, z}) => {
          const deps = x.table.row_breakpoint._.split(',');
          x = x.table.data._.split(',');
          y = y.table.data._.split(',');
          z = z.table.data._.split(',');
          return {
            cg_dependency: 0,
            rows: deps.map((dep, i) => ({ dep, x: x[i], y: y[i], z: z[i] }))
          };
        })
      );
    } else {
      return of(false);
    }
  }

  private getMassInertiaData(obj: any): Observable<MoiFormValues | boolean> {
    if (obj.properties.mass_properties) {
      const { ixx, iyy, izz, ixy, ixz, iyz } = obj.properties.mass_properties.moment_of_inertia_kg_m2;
      return forkJoin({
        ixx: this.importTableFromFile(ixx.filename._),
        iyy: this.importTableFromFile(iyy.filename._),
        izz: this.importTableFromFile(izz.filename._),
        ixy: this.importTableFromFile(ixy.filename._),
        ixz: this.importTableFromFile(ixz.filename._),
        iyz: this.importTableFromFile(iyz.filename._)
      }).pipe(
        map(({ixx, iyy, izz, ixy, ixz, iyz}) => {
          const deps = ixx.table.row_breakpoint._.split(',');
          ixx = ixx.table.data._.split(',');
          iyy = iyy.table.data._.split(',');
          izz = izz.table.data._.split(',');
          ixy = ixy.table.data._.split(',');
          ixz = ixz.table.data._.split(',');
          iyz = iyz.table.data._.split(',');
          return {
            inertia_dependency: 0,
            rows: deps.map((dep, i) => ({ dep, ixx: ixx[i], iyy: iyy[i], izz: izz[i], ixy: ixy[i], ixz: ixz[i], iyz: iyz[i] }))
          };
        })
      );
    } else {
      return of(false);
    }
  }

  private patchMassPropForm(objItem: Item, subsection: string, value: any[]): void {
    // Get the form.
    const form = objItem
      .sections
      .find(sec => sec.name === 'mass')
      .subsections
      .find(subsec => subsec.name === subsection)
      .form;
    // Start by patching the form. This will set all form values that are not FormArrays
    form.patchValue(value);
    // Grab the form and cast it to type FormArray.
    const formArray = form.controls.rows as FormArray;
    // Reset any existing values.
    formArray.reset();
    // add each row to the form array.
    value['rows'].forEach(row => {
      // Create form controls from each value in the row.
      Object.keys(row).forEach(key => {
        row[key] = new FormControl(row[key]);
      });
      // Create a form group for the whole row.
      const rowGroup = new FormGroup(row);
      // Pass the form group to the form array.
      formArray.push(rowGroup);
    });
  }

  /*********************************
   * Aerodynamics
   *********************************/

  private getAeroGeneralData(obj: any): { aero_mode, aero_ref_area, aero_ref_length, aero_moment_ref_x, aero_moment_ref_y, aero_moment_ref_z } {
    const { mode, reference } = obj.properties.aerodynamics;
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

  private getAeroPageData(obj: any): Observable<{ [key: string]: CoefficientFormValues }> {
    const { coefficients, coefficients_dependencies } = obj.properties.aerodynamics;
    const keys = Object.keys(coefficients);
    const coFileDict = keys.reduce((dict, key) => {
      return {
        ...dict,
        [key]: this.importTableFromFile(coefficients[key].filename._)
      };
    }, {});
    return forkJoin(coFileDict).pipe(
      map(result => {
        const coFormValues: { [key: string]: CoefficientFormValues } = Object.keys(result).reduce((formValues, key) => {
          return {
            ...formValues,
            [key]: this.createAeroFormValuesFromTableData(result[key]['table'], coefficients_dependencies[key].dependency._)
          };
        }, {});
        return coFormValues;
      })
    );
  }

  private createAeroFormValuesFromTableData(table: any, dependency: string): { [key: string]: CoefficientFormValues } {
    // Determine the size of the table.
    const size = Number(table.dimension._);

    // Variable for the aggregated table data.
    let mergedData;

    if (size === 1) {
      // 1D TABLE
      const { row_breakpoint, data } = table;
      // Data from files exists as comma separated strings, so split it into arrays.
      const bpArray = row_breakpoint._.split(',').map(_ => _.trim());
      const dataArray = data._.split(',').map(_ => _.trim());
      // Define 1D table form values.
      mergedData = {
        table_1D: {
          dep: Number(dependency),
          rows: bpArray.map((bp, i) => ({ dep: bp, value: dataArray[i]}))
        }
      };
    } else {
      // 2D TABLE
      const { row_breakpoint, column_breakpoint, data } = table;
      // SPlit dependecy string for 2d tables.
      const [ row_dep, col_dep ] = dependency.split(',').map(_ => Number(_.trim()));
      // Define 2D table form values.
      mergedData = {
        table_2D: {
          row_dep,
          col_dep,
          rows: row_breakpoint._.split(',').map(_ => _.trim()),
          columns: column_breakpoint._.split(',').map(_ => _.trim()),
          data: data._.split('\n').map(_ => _.split(',').map(_ => _.trim()))
        }
      };
    }

    // Aggregate the data and return.
    return {
      size,
      ...mergedData
    };
  }

  private patchAeroPageForm(objItem: Item, subsection: string, value: any): void {
    // Get the form.
    const form = objItem
      .sections
      .find(sec => sec.name === 'aerodynamics')
      .subsections
      .find(subsec => subsec.name === subsection)
      .form;
    // Start by patching the form. This will set all form values that are not FormArrays
    form.patchValue(value);

    // Patch form arrays.
    Object.keys(value).forEach(key => {
      const { size, table_1D, table_2D } = value[key];
      if (size === 1) {
        this.patch1DForm(table_1D, form, key);
      } else {
        this.patch2DForm(table_2D, form, key);
      }
    });
  }

  private patch1DForm(table: Table1D, form: any, key: string): void {
    // Cast the control to a form array.
    const formArray = form.controls[key].controls.table_1D.controls.rows as FormArray;
    // Reset the array
    formArray.reset();
    // Map the table row values to new form groups and push them to the form array.
    table.rows.map(row => {
      return new FormGroup({
        dep: new FormControl(row.dep),
        value: new FormControl(row.value)
      });
    }).forEach(group => {
      formArray.push(group);
    });
  }

  private patch2DForm(table: Table2D, form: any, key: string): void {
    // Cast the control to a form array.
    const colArr = form.controls[key].controls.table_2D.controls.columns as FormArray;
    const rowArr = form.controls[key].controls.table_2D.controls.rows as FormArray;
    const dataArr = form.controls[key].controls.table_2D.controls.data as FormArray;
    // Reset the form arrays
    colArr.reset();
    rowArr.reset();
    dataArr.reset();

    // Patch in column array
    table.columns.forEach(col => {
      colArr.push(new FormControl(col));
    });

    // Patch in row array.
    table.rows.forEach(row => {
      rowArr.push(new FormControl(row));
    });

    // Patch in data array.
    table.data.forEach(dataRow => {
      dataArr.push(new FormArray(dataRow.map(cell => new FormControl(cell))));
    });
  }

  /*********************************
   * Prop Sources
   *********************************/

  private getPropSourceData(obj: any): Observable<PropSourceFormValues[]> {
    let { hardware } = obj.properties.propulsion;
    if (!Array.isArray(hardware)) hardware = [ hardware ];
    return zip(...hardware.map(source => this.getSource(source))) as unknown as Observable<PropSourceFormValues[]>;
  }

  private getSource(source: any): Observable<PropSourceFormValues> {
    const { name, nozzle_exit_area_m2, orientation_deg, position, vaccum_thrust_N, specific_impulse, mass_flow_rate_kg_per_sec } = source;
    const [ position_x, position_y, position_z ] = position._.split(',').map(_ => _.trim());
    const [ orientation_pitch, orientation_roll, orientation_yaw ] = orientation_deg._.split(',').map(_ => _.trim());
    const mode = Number(source.mode._);
    const sourceValues: PropSourceFormValues = {
      name: name._,
      mode,
      nozzle_exit_area: nozzle_exit_area_m2._,
      position_x, position_y, position_z, orientation_pitch, orientation_roll, orientation_yaw
    };
    if (mode > 0) {
      const dict = {
        table_1: null,
        table_2: this.importTableFromFile(vaccum_thrust_N.filename._)
      };
      dict.table_1 = mode === 1 ? this.importTableFromFile(specific_impulse.filename._) : this.importTableFromFile(mass_flow_rate_kg_per_sec.filename._);
      return forkJoin(dict).pipe(
        map(({ table_1, table_2 }) => {
          sourceValues.table_1 = this.map1DTableToForm(table_1['table']);
          sourceValues.table_2 = this.map1DTableToForm(table_2['table']);
          return sourceValues;
        })
      );
    } else {
      return of(sourceValues);
    }
  }

  private patchPropSourceData(objItem: Item, formData: any[]): void {
    // Get the form.
    const form = objItem
      .sections
      .find(sec => sec.name === 'propulsion')
      .subsections
      .find(subsec => subsec.name === 'general')
      .form;
    // Grab the sources form array and cast it.
    const sourceArray = form.controls.sources as FormArray;
    // iterate over each propulsion source.
    formData.forEach(propSource => {
      // Create a new form group with the expect structure.
      const sourceGroup = propSourceFormGroupFactory();
      // Patch all non-formarray values.
      sourceGroup.patchValue(propSource);
      if (!!propSource.table_1 && !!propSource.table_2) {
        const table1Arr = sourceGroup.controls.table_1 as FormArray;
        const table2Arr = sourceGroup.controls.table_2 as FormArray;
        // Pathc table 1 values
        propSource.table_1.map(row => {
          return new FormGroup({
            dep: new FormControl(row.dep),
            value: new FormControl(row.value)
          });
        }).forEach(group => {
          table1Arr.push(group);
        });
        // Patch table 2 values.
        propSource.table_2.map(row => {
          return new FormGroup({
            dep: new FormControl(row.dep),
            value: new FormControl(row.value)
          });
        }).forEach(group => {
          table2Arr.push(group);
        });
      }
      sourceArray.push(sourceGroup);
    });
  }

  /*********************************
   * Initial Conditions
   *********************************/

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

  /*********************************
   * Script / Segments
   *********************************/

  private getScriptData(obj: any): Observable<SegmentFormValues[]> {
    let { segment } = obj.properties.script;
    if (!Array.isArray(segment)) segment = [ segment ];
    let { hardware } = obj.properties.propulsion;
    if (!Array.isArray(hardware)) hardware = [ hardware ];
    const propSourceNames = hardware.map(h => h.name._);
    return zip(...segment.map(s => this.getSegmentData(s, propSourceNames))) as unknown as Observable<SegmentFormValues[]>;
  }

  private getSegmentData(segment: any, propSourceNames: string[]): Observable<SegmentFormValues> {
    const { name, dof, print_dt, integration_dt, reset_user_time, reset_propulsion_time, enable, gnc, end_criteria } = segment;
    const { mode, frame, value_1, value_2, value_3 } = gnc;
    const { parameter, condition, value } = end_criteria;

    const activeIndicies = enable?.propulsion._?.split(',').map(_ => Number(_)) || [ ...propSourceNames.map(() => 0) ];
    const activePropSources = propSourceNames.reduce((group, name, index) => {
      return {
        ...group,
        [name]: binToBool(activeIndicies[index])
      };
    }, {});

    return forkJoin({
      value_1: this.importTableFromFile(value_1.filename._),
      value_2: this.importTableFromFile(value_2.filename._),
      value_3: this.importTableFromFile(value_3.filename._)
    }).pipe(
      map(({ value_1, value_2, value_3 }) => {
        const deps = value_1.table.row_breakpoint._.split(',');
        const data1 = value_1.table.data._.split(',');
        const data2 = value_2.table.data._.split(',');
        const data3 = value_3.table.data._.split(',');
        const rows = deps.map((dep, i) => ({ dep, value_1: data1[i], value_2:  data2[i], value_3: data3[i] }));
        const segmentFormValues: SegmentFormValues = {
          name: name._,
          dof: dof._,
          print_dt: print_dt._,
          integration_dt: integration_dt._,
          reset_user_time: binToBool(reset_user_time._),
          reset_propulsion_time: binToBool(reset_propulsion_time._),
          active_propulsion_sources: activePropSources,
          gnc: {
            mode: Number(mode._),
            frame: Number(frame._),
            rows
          },
          parameter: Number(parameter._),
          condition: Number(condition._),
          value: value._,
        };
        return segmentFormValues;
      })
    );
  }

  private patchSegmentData(objItem: Item, formData: any[]): void {
    // Get the form.
    const form = objItem
      .sections
      .find(sec => sec.name === 'script')
      .subsections
      .find(subsec => subsec.name === 'general')
      .form;
    // Grab the sources form array and cast it.
    const segmentArray = form.controls.segments as FormArray;
    // iterate over each segment.
    formData.forEach(segment => {
      // Create a new form group with the expect structure.
      const segmentGroup = segmentFormGroupFactory();
      // Patch all non-formarray values.
      segmentGroup.patchValue(segment);
      // Patch in active prop sources.
      const activeGroup = segmentGroup.controls.active_propulsion_sources as FormGroup;
      Object.keys(segment.active_propulsion_sources).forEach(key => {
        activeGroup.addControl(key, new FormControl(segment.active_propulsion_sources[key]));
      });
      // Patch in GNC rows.
      const gncGroup = segmentGroup.controls.gnc as FormGroup;
      const gncRowsArr = gncGroup.controls.rows as FormArray;
      segment.gnc.rows.map(row => {
        return new FormGroup({
          dep: new FormControl(row.dep),
          value_1: new FormControl(row.value_1),
          value_2: new FormControl(row.value_2),
          value_3: new FormControl(row.value_3)
        });
      }).forEach(rowGroup => {
        gncRowsArr.push(rowGroup);
      });
      segmentArray.push(segmentGroup);
    });
  }
}
