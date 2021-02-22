import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AeroPageComponent } from '../aero-page/aero-page.component';

@Component({
  selector: 'aero-axi',
  templateUrl: '../aero-page/aero-page.component.html'
})
export class AeroAxiComponent extends AeroPageComponent {
  public pageTitle = 'Axisymmetric';

  public coefficientSubgroups = [
    { title: 'Force Coefficients', buttons: [
      { id: 'force_1', label: 'Caxial' },
      { id: 'force_2', label: 'Clat' },
      { id: 'force_3', label: 'Cnormal' }
    ]},
    { title: 'Moment Coefficients', buttons: [
      { id: 'moment_1', label: 'CL' },
      { id: 'moment_2', label: 'CM' },
      { id: 'moment_3', label: 'CN' }
    ]},
    { title: 'Moment Damping Coefficients', buttons: [
      { id: 'moment_damping_1', label: 'clp' },
      { id: 'moment_damping_2', label: 'cmq' },
      { id: 'moment_damping_3', label: 'cnr' }
    ]}
  ];

  constructor(protected route: ActivatedRoute) {
    super(route);
  }
}
