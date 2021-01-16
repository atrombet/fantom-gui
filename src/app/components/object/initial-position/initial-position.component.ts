import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SelectOption } from '@interfaces';
import { SubsectionBaseComponent } from '@components/shared';

@Component({
  selector: 'initial-position',
  templateUrl: './initial-position.component.html'
})
export class InitialPositionComponent extends SubsectionBaseComponent {
  public frameOptions: SelectOption[] = [
    { value: 'eci', viewValue: 'ECI' },
    { value: 'ecef', viewValue: 'ECEF' },
    { value: 'geodetic', viewValue: 'Geodetic' }
  ];

  constructor(protected route: ActivatedRoute) {
    super(route);
  }
}
