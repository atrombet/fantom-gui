import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SelectOption } from '@interfaces';
import { SubsectionBaseComponent } from '@components/shared';
import { ORIENTATION_OPTIONS } from '@constants';

@Component({
  selector: 'initial-orientation',
  templateUrl: './initial-orientation.component.html'
})
export class InitialOrientationComponent extends SubsectionBaseComponent {
  public frameOptions: SelectOption[] = ORIENTATION_OPTIONS;

  constructor(protected route: ActivatedRoute) {
    super(route);
  }
}
