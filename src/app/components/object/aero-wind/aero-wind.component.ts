import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AeroPageComponent } from '../aero-page/aero-page.component';

@Component({
  selector: 'aero-wind',
  templateUrl: '../aero-page/aero-page.component.html'
})
export class AeroWindComponent extends AeroPageComponent {
  public pageTitle = 'Wind';

  public coefficientSubgroups = [
    { title: 'Force Coefficients', buttons: [
      { id: 'force_1', label: 'Cdrag' },
      { id: 'force_2', label: 'Cside' },
      { id: 'force_3', label: 'Clift' }
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
