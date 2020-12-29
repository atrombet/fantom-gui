import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SelectOption } from '@interfaces';

@Component({
  selector: 'coefficient-table',
  templateUrl: './coefficient-table.component.html',
  styles: [
  ]
})
export class CoefficientTableComponent {
  @Input() public form: FormGroup;

  public depOptions: SelectOption[] = [
    { value: 1, viewValue: 'Alpha' },
    { value: 2, viewValue: 'Total Alpha' },
    { value: 3, viewValue: 'Beta' },
    { value: 4, viewValue: 'Aerodynamic Phi' },
    { value: 5, viewValue: 'Mach' },
    { value: 6, viewValue: 'Altitude' }
  ];

  constructor() { }

  public getOptionName(id: number): string {
    return this.depOptions.reduce((obj, option) => {
      return {
        ...obj,
        [option.value]: option.viewValue
      };
    }, {})[id];
  }
}
