import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubsectionBaseComponent } from '@components/shared';
import { SelectOption } from '@interfaces';

@Component({
  selector: 'meta-general',
  templateUrl: './meta-general.component.html'
})
export class MetaGeneralComponent extends SubsectionBaseComponent {
  public dofOptions: SelectOption[] = [
    { value: 1, viewValue: '6' },
    { value: 2, viewValue: '3 + 3' },
    { value: 3, viewValue: '3' }
  ];

  public parentObjectOptions: SelectOption[] = [
    { value: 1, viewValue: 'none' }
  ];

  public solverOptions: SelectOption[] = [
    { value: 1, viewValue: 'Runge-Kutta 4th Order' }
  ];

  constructor(protected route: ActivatedRoute) {
    super(route);
  }
}
