import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SelectOption } from '@interfaces';
import { SubsectionBaseComponent } from '@components/shared';
import { POSITION_OPTIONS } from '@constants';

@Component({
  selector: 'initial-position',
  templateUrl: './initial-position.component.html'
})
export class InitialPositionComponent extends SubsectionBaseComponent {
  public frameOptions: SelectOption[] = POSITION_OPTIONS;

  constructor(protected route: ActivatedRoute) {
    super(route);
  }
}
