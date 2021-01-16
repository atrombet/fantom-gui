import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SelectOption } from '@interfaces';
import { SubsectionBaseComponent } from '@components/shared';

@Component({
  selector: 'initial-orientation',
  templateUrl: './initial-orientation.component.html'
})
export class InitialOrientationComponent extends SubsectionBaseComponent {
  public frameOptions: SelectOption[] = [
    { value: 'eci', viewValue: 'ECI' },
    { value: 'ecef', viewValue: 'ECEF' },
    { value: 'ned', viewValue: 'NED' }
  ];

  constructor(protected route: ActivatedRoute) {
    super(route);
  }
}
