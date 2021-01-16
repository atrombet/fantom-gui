import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SelectOption } from '@interfaces';
import { SubsectionBaseComponent } from '@components/shared';

@Component({
  selector: 'initial-velocity',
  templateUrl: './initial-velocity.component.html'
})
export class InitialVelocityComponent extends SubsectionBaseComponent {
  public frameOptions: SelectOption[] = [
    { value: 'eci', viewValue: 'ECI' },
    { value: 'ecef', viewValue: 'ECEF' }
  ];

  constructor(protected route: ActivatedRoute) {
    super(route);
  }
}
