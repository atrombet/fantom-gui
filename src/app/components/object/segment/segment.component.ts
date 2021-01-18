import { Component, Input } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { SelectOption, TableColumn } from '@interfaces';

@Component({
  selector: 'segment',
  templateUrl: './segment.component.html'
})
export class SegmentComponent {
  @Input() public segment: FormGroup;
  @Input() public propSources: string[];

  public dofOptions: SelectOption[] = [
    { value: '3+3', viewValue: '3 + 3' },
    { value: '6', viewValue: '6' }
  ];

  public modeOptions: SelectOption[] = [
    { value: 'unguided', viewValue: 'Unguided' },
    { value: 'fixed_angle', viewValue: 'Fixed Angle' },
    { value: 'fixed_rate', viewValue: 'Fixed Rate' },
    { value: 'steady_level', viewValue: 'Steady Level' },
    { value: 'max_l/d', viewValue: 'Max L/D' }
  ];

  public frameOptions: SelectOption[] = [
    { value: 'eci', viewValue: 'ECI' },
    { value: 'ecef', viewValue: 'ECEF' },
    { value: 'ned', viewValue: 'NED' },
    { value: 'wind', viewValue: 'WIND' }
  ];

  public tableColumns: TableColumn[] = [
    { variable: 'value_1', headerName: 'Φ [deg]' },
    { variable: 'value_2', headerName: 'Θ [deg]' },
    { variable: 'value_3', headerName: 'Ψ [deg]' }
  ];

  public parameterOptions: SelectOption[] = [
    { value: 'altitude', viewValue: 'Altitude' },
    { value: 'ground_range', viewValue: 'Ground Range' },
    { value: 'thrust', viewValue: 'Thrust' },
    { value: 'time', viewValue: 'Time' },
    { value: 'segment_time', viewValue: 'Segment Time' },
    { value: 'other', viewValue: 'Other' }
  ];

  public criteriaOptions: SelectOption[] = [
    { value: '-1', viewValue: '<' },
    { value: '0', viewValue: '=' },
    { value: '1', viewValue: '>' }
  ];
}
