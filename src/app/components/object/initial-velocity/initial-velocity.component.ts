import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SelectOption } from '@interfaces';
import { SubsectionBaseComponent } from '@components/shared';
import { VELOCITY_OPTIONS } from '@constants';

@Component({
  selector: 'initial-velocity',
  templateUrl: './initial-velocity.component.html'
})
export class InitialVelocityComponent extends SubsectionBaseComponent {
  public frameOptions: SelectOption[] = VELOCITY_OPTIONS;

  constructor(protected route: ActivatedRoute) {
    super(route);
  }
}
