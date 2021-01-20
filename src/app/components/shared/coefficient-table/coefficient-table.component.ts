import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SelectOption } from '@interfaces';

@Component({
  selector: 'coefficient-table',
  template: ``
})
export class CoefficientTableComponent {
  @Input() public form: FormGroup;

  @Input() public depOptions: SelectOption[];

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
