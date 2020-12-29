import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubsectionBaseComponent } from '@components/shared';

@Component({
  selector: 'aero-axi',
  templateUrl: './aero-axi.component.html'
})
export class AeroAxiComponent extends SubsectionBaseComponent {
  public axiSubgroups = [
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
    { title: 'Force Coefficients', buttons: [
      { id: 'damping1', label: 'clp' },
      { id: 'damping2', label: 'cmq' },
      { id: 'damping3', label: 'cnr' }
    ]}
  ];

  public selectedCoefficient: string;

  constructor(protected route: ActivatedRoute) {
    super(route);
  }

  public coefficientSelected(id: string): void {
    this.selectedCoefficient = id;
  }
}
