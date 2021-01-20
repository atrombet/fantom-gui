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
      { id: 'force1', label: 'Caxial' },
      { id: 'force2', label: 'Clat' },
      { id: 'force3', label: 'Cnormal' }
    ]},
    { title: 'Moment Coefficients', buttons: [
      { id: 'moment1', label: 'CL' },
      { id: 'moment2', label: 'CM' },
      { id: 'moment3', label: 'CN' }
    ]},
    { title: 'Moment Damping Coefficients', buttons: [
      { id: 'damping1', label: 'clp' },
      { id: 'damping2', label: 'cmq' },
      { id: 'damping3', label: 'cnr' }
    ]}
  ];

  constructor(protected route: ActivatedRoute) {
    super(route);
  }
}
