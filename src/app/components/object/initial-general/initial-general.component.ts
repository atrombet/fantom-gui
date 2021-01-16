import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SelectOption } from '../../../interfaces';
import { SubsectionBaseComponent } from '../../shared';

@Component({
  selector: 'initial-general',
  templateUrl: './initial-general.component.html'
})
export class InitialGeneralComponent extends SubsectionBaseComponent {
  public frameOptions: SelectOption[] = [
    { value: 'eci', viewValue: 'ECI' },
    { value: 'ecf', viewValue: 'ECF' },
    { value: 'geodetic', viewValue: 'Geodetic' }
  ];

  constructor(protected route: ActivatedRoute) {
    super(route);
  }
}
