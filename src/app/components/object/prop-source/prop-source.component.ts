import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SelectOption } from '../../../interfaces';

@Component({
  selector: 'prop-source',
  templateUrl: './prop-source.component.html'
})
export class PropSourceComponent {
  @Input() public propSource: FormGroup;

  public timeVaryingOptions: SelectOption[] = [
    { value: 1, viewValue: 'Thrust [N]'},
    { value: 2, viewValue: 'Mass Flow Rate [kg/sec]'},
    { value: 3, viewValue: 'Specific Impulse [sec]'},
  ];

  constructor() {}

  public getOptionName(value: number): string {
    return this.timeVaryingOptions.find(option => option.value === value)?.viewValue;
  }
}
