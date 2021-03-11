import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SelectOption } from '@interfaces';

@Component({
  selector: 'prop-source',
  templateUrl: './prop-source.component.html'
})
export class PropSourceComponent {
  @Input() public propSource: FormGroup;

  public get tableDeps(): { dep_1: string, dep_2: string } {
    switch (this.propSource.get('mode').value) {
      case 1: return { dep_1: 'Specific Impulse [sec]', dep_2: 'Thrust [N]' };
      case 2: return { dep_1: 'Mass Flow Rate [kg/sec]', dep_2: 'Thrust [N]' };
      default: return { dep_1: '', dep_2: '' };
    }
  };

  public propulsionModeOptions: SelectOption[] = [
    { value: 0, viewValue: 'No Propulsion/Propulsive Forces are zero'},
    { value: 1, viewValue: 'Time dependent Isp and Thrust'},
    { value: 2, viewValue: 'Time dependent Mdot and Thrust'},
  ];

  constructor() {}

  public getDepName(key: string): string {
    return this.tableDeps[key];
  }
}
