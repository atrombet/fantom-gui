import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubsectionBaseComponent } from '@components/shared';

@Component({
  selector: 'aero-wind',
  templateUrl: './aero-wind.component.html'
})
export class AeroWindComponent extends SubsectionBaseComponent {
  public windSubgroups = [
    { title: 'Force Coefficients', buttons: [
      { id: 'force1', label: 'Cdrag' },
      { id: 'force2', label: 'Cside' },
      { id: 'force3', label: 'Clift' }
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

  public selectedCoefficient: string;

  constructor(protected route: ActivatedRoute) {
    super(route);
  }

  public coefficientSelected(id: string): void {
    this.selectedCoefficient = id;
  }
}
