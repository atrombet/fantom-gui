// tslint:disable: no-string-literal
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubsectionBaseComponent } from '@components/shared';
import { SelectOption } from '@interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'aero-page',
  templateUrl: './aero-page.component.html'
})
export class AeroPageComponent extends SubsectionBaseComponent {
  public selectedCoefficient: string;

  public tableDimOptions: SelectOption[] = [
    { value: 1, viewValue: '1D' },
    { value: 2, viewValue: '2D' }
  ];

  public depOptions: SelectOption[] = [
    { value: 1, viewValue: 'Alpha' },
    { value: 2, viewValue: 'Total Alpha' },
    { value: 3, viewValue: 'Beta' },
    { value: 4, viewValue: 'Aerodynamic Phi' },
    { value: 5, viewValue: 'Mach' },
    { value: 6, viewValue: 'Altitude' }
  ];

  constructor(protected route: ActivatedRoute) {
    super(route);
  }

  public coefficientSelected(id: string): void {
    this.selectedCoefficient = id;
  }

  public disableMomentAndDampingCoefficients(coSubGroups): void {
    coSubGroups[1].buttons.forEach(button => button.enable = false);
    coSubGroups[2].buttons.forEach(button => button.enable = false);
  }

  public enableMomentAndDampingCoefficients(coSubGroups): void {
    coSubGroups[1].buttons.forEach(button => button.enable = true);
    coSubGroups[2].buttons.forEach(button => button.enable = true);
  }
}
