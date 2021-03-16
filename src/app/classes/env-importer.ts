import { ItemType } from '@enums';
import { Item, Table1D, Table2D, GravityFormValues, AtmoFormValues, BodyFormValues, WindFormValues, EpochFormValues } from '@interfaces';
import { binToBool, patchSubsectionForm } from '@functions';
import { BaseImporter } from './base-importer';
import { forkJoin, Observable, of, zip } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ENVIRONMENT_SECTIONS } from '@constants';

export class EnvironmentImporter extends BaseImporter {
  constructor(public files: FileList) {
    super(files);
  }

  public createEnvItem(env: any, id: number): Item {
    // Initialize the item.
    const envItem: Item =  {
      id,
      name: env.name._,
      type: ItemType.Environment,
      sections: ENVIRONMENT_SECTIONS()
    };

    // Patch gravity data.
    patchSubsectionForm(envItem, 'gravity', 'general', this.getGravData(env));
    // Patch epoch data
    patchSubsectionForm(envItem, 'epoch', 'general', this.getEpochData(env));

    forkJoin({
      atmo: this.getAtmoData(env),
      body: this.getBodyData(env),
      wind: this.getWindData(env)
    }).pipe(
      tap(({ atmo, body, wind }) => {
        // Patch atmo data.
        this.patchAtmoForm(envItem, atmo);
        // Patch body data
        patchSubsectionForm(envItem, 'body', 'general', body);
        // Patch wind data.
        this.patchWindForm(envItem, wind);
      })
    ).subscribe();

    return envItem;
  }

  public getGravData(env: any): GravityFormValues {
    const { enable, mode } = env.gravity;
    return {
      gravity_on: binToBool(enable._),
      gravity_model: Number(mode._)
    };
  }

  public getAtmoData(env: any): Observable<AtmoFormValues> {
    const { density_kg_per_m3, pressure_N_per_m2, speed_of_sound_m_per_sec, temperature_degrees_kelvin } = env.atmosphere;
    const enable = binToBool(env.atmosphere.enable._);
    const atmospheric_model = Number(env.atmosphere.mode._);
    const values: AtmoFormValues = {
      atmosphere_on: enable,
      atmospheric_model,
      rows: []
    };
    if (atmospheric_model === 0 && enable) {
      return forkJoin({
        density: this.importTableFromFile(density_kg_per_m3.filename._),
        pressure: this.importTableFromFile(pressure_N_per_m2.filename._),
        sos: this.importTableFromFile(speed_of_sound_m_per_sec.filename._),
        temp: this.importTableFromFile(temperature_degrees_kelvin.filename._)
      }).pipe(
        map(({ density, pressure, sos, temp }) => {
          const deps = density.table.row_breakpoint._.split(',');
          density = density.table.data._.split(',');
          pressure = pressure.table.data._.split(',');
          sos = sos.table.data._.split(',');
          temp = temp.table.data._.split(',');
          return {
            ...values,
            rows: deps.map((dep, i) => ({
              dep,
              density_kg_per_m3: density[i],
              pressure_N_per_m2: pressure[i],
              speed_of_sound_m_per_sec: sos[i],
              temperature_degrees_kelvin: temp[i]
            }))
          };
        })
      );
    } else {
      return of(values);
    }
  }

  private patchAtmoForm(envItem: Item, formData: AtmoFormValues): void {
    // Get the form.
    const form = envItem
      .sections
      .find(sec => sec.name === 'atmosphere')
      .subsections
      .find(subsec => subsec.name === 'general')
      .form;
    form.patchValue(formData);
    const rowArray = form.controls.rows as FormArray;
    formData.rows.forEach(row => {
      const group = new FormGroup({
        dep: new FormControl(row.dep),
        density_kg_per_m3: new FormControl(row.density_kg_per_m3),
        pressure_N_per_m2: new FormControl(row.pressure_N_per_m2),
        speed_of_sound_m_per_sec: new FormControl(row.speed_of_sound_m_per_sec),
        temperature_degrees_kelvin: new FormControl(row.temperature_degrees_kelvin)
      });
      rowArray.push(group);
    });
  }

  public getBodyData(env: any): Observable<BodyFormValues> {
    const { rotation_enable, custom } = env.body;
    const mode = Number(env.body.mode._);
    if (mode === 0 && !!custom) {
      return this.importTableFromFile(custom.filename._).pipe(
        map(({ custom_body }) => {
          return {
            body_rotation_on: binToBool(rotation_enable._),
            body_model: mode,
            sea_level_gravitational_acceleration_m_per_s2: custom_body.sea_level_gravitational_acceleration_m_per_s2._,
            gravitational_parameter_m3_per_sec2: custom_body.gravitational_parameter_m3_per_sec2._,
            eccentricity: custom_body.eccentricity._,
            rotation_rate_rad_per_sec: custom_body.rotation_rate_rad_per_sec._,
            equatorial_radius_m: custom_body.equatorial_radius_m._
          };
        })
      );
    } else {
      return of({
        body_rotation_on: binToBool(rotation_enable._),
        body_model: mode
      });
    }
  }

  public getWindData(env: any): Observable<WindFormValues> {
    const { north, east, up } = env.wind;
    const enable = binToBool(env.wind.enable._);
    const wind_profile = Number(env.wind.mode._);
    const values: WindFormValues = {
      wind_on: enable,
      wind_profile,
      rows: [],
    };
    if (wind_profile === 0 && enable) {
      return forkJoin({
        north: this.importTableFromFile(north.filename._),
        east: this.importTableFromFile(east.filename._),
        up: this.importTableFromFile(up.filename._)
      }).pipe(
        map(({ north, east, up }) => {
          const deps = north.table.row_breakpoint._.split(',');
          north = north.table.data._.split(',');
          east = east.table.data._.split(',');
          up = up.table.data._.split(',');
          return {
            ...values,
            rows: deps.map((dep, i) => ({
              dep,
              north: north[i],
              east: east[i],
              up: up[i]
            }))
          };
        })
      );
    } else {
      return of(values);
    }
  }

  private patchWindForm(envItem: Item, formData: WindFormValues): void {
    // Get the form.
    const form = envItem
      .sections
      .find(sec => sec.name === 'wind')
      .subsections
      .find(subsec => subsec.name === 'general')
      .form;
    form.patchValue(formData);
    const rowArray = form.controls.rows as FormArray;
    formData.rows.forEach(row => {
      const group = new FormGroup({
        dep: new FormControl(row.dep),
        north: new FormControl(row.north),
        east: new FormControl(row.east),
        up: new FormControl(row.up)
      });
      rowArray.push(group);
    });
  }

  public getEpochData(env): EpochFormValues {
    const { enable, gregorian_date, utc } = env.epoch;
    return {
      epoch_on: binToBool(enable._),
      epoch_date: new Date(gregorian_date.value._),
      epoch_time: utc.value._.split(',').map(_ => _.trim()).join(':')
    };
  }
}

