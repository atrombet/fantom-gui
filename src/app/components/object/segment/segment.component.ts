import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SelectOption, TableColumn } from '@interfaces';

@Component({
  selector: 'segment',
  templateUrl: './segment.component.html'
})
export class SegmentComponent implements OnInit {
  private _segment: FormGroup;

  @Input() public set segment(group: FormGroup) {
    this._segment = group;
    this.setupPropSourceFormGroup(group);
  }

  public get segment(): FormGroup {
    return this._segment;
  }

  @Input() public propSources: string[];
  @Input() public allowSixDof: boolean;

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

  public ngOnInit(): void {
    this.setupPropSourceFormGroup(this._segment);
  }

  public setupPropSourceFormGroup(segment: FormGroup): void {
    if (this.propSources) {
      const propSourceGroup = segment.get('active_propulsion_sources') as FormGroup;
      this.propSources.forEach(name => {
        propSourceGroup.addControl(name, new FormControl(false));
      });
    }
  }
}
