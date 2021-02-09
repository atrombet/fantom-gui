import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubsectionBaseComponent } from '@components/shared';
import { SelectOption, TableColumn } from '@interfaces';

@Component({
  selector: 'atmosphere-general',
  templateUrl: './atmosphere-general.component.html'
})
export class AtmosphereGeneralComponent extends SubsectionBaseComponent {
  // The options for Atmospheric Model
  public atmoModelOptions: SelectOption[] = [
    { value: 0, viewValue: 'Custom' },
    { value: 1, viewValue: '1976 STD' }
  ];

  public get atmoOn(): boolean {
    if (this.form) {
      return this.form.get('atmosphere_on').value;
    }
  }

  public get customAtmo(): boolean {
    if (this.form) {
      return this.form.get('atmospheric_model').value === 0;
    }
  }

  public columns: TableColumn[] = [
    { variable: 'density_kg_per_m3', headerName: 'Density [kg/m^3]' },
    { variable: 'pressure_N_per_m2', headerName: 'Pressure [N/m^2]' },
    { variable: 'speed_of_sound_m_per_sec', headerName: 'Speed of Sound [m/s]' },
    { variable: 'temperature_degrees_kelvin', headerName: 'Temperature [K]' },
  ];

  constructor(protected route: ActivatedRoute) {
    super(route);
  }
}
