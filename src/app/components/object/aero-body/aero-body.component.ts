import { AfterViewInit, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AeroPageComponent } from '../aero-page/aero-page.component';

@Component({
  selector: 'aero-body',
  templateUrl: '../aero-page/aero-page.component.html'
})
export class AeroBodyComponent extends AeroPageComponent implements AfterViewInit {
  public pageTitle = 'Body-Fixed';

  public coefficientSubgroups = [
    { title: 'Force Coefficients', buttons: [
      { id: 'force_1', label: 'CX', enable: true },
      { id: 'force_2', label: 'CY', enable: true },
      { id: 'force_3', label: 'CZ', enable: true }
    ]},
    { title: 'Moment Coefficients', buttons: [
      { id: 'moment_1', label: 'CL', enable: false },
      { id: 'moment_2', label: 'CM', enable: false },
      { id: 'moment_3', label: 'CN', enable: false }
    ]},
    { title: 'Moment Damping Coefficients', buttons: [
      { id: 'moment_damping_1', label: 'clp', enable: false },
      { id: 'moment_damping_2', label: 'cmq', enable: false },
      { id: 'moment_damping_3', label: 'cnr', enable: false }
    ]}
  ];

  constructor(protected route: ActivatedRoute) {
    super(route);
  }

  public ngAfterViewInit(): void {
    if (this.data.sixDof) {
      this.enableMomentAndDampingCoefficients(this.coefficientSubgroups);
    }
  }
}
