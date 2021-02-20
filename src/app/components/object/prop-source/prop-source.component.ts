import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SelectOption } from '@interfaces';

@Component({
  selector: 'prop-source',
  templateUrl: './prop-source.component.html'
})
export class PropSourceComponent implements OnInit {
  private subs = new Subscription();

  @Input() public propSource: FormGroup;

  public tableDeps: { dep_1: string, dep_2: string } = {
    dep_1: '',
    dep_2: ''
  };

  public propulsionModeOptions: SelectOption[] = [
    { value: 0, viewValue: 'No Propulsion/Propulsive Forces are zero'},
    { value: 1, viewValue: 'Time dependent Isp and Thrust'},
    { value: 2, viewValue: 'Time dependent Mdot and Thrust'},
  ];

  constructor() {}

  public ngOnInit(): void {
    this.propSource.get('mode').valueChanges.subscribe(mode => {
      switch (mode) {
        case 1:
          this.tableDeps = {
            dep_1: 'Specific Impulse [sec]',
            dep_2: 'Thrust [N]'
          };
          break;
        case 2:
          this.tableDeps = {
            dep_1: 'Mass Flow Rate [kg/sec]',
            dep_2: 'Thrust [N]'
          };
          break;
        default:
          this.tableDeps = {
            dep_1: '',
            dep_2: ''
          };
          break;
      }
    });
  }

  public getDepName(key: string): string {
    return this.tableDeps[key];
  }
}
