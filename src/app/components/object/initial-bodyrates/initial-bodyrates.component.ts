import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SelectOption } from '@interfaces';
import { SubsectionBaseComponent } from '@components/shared';

@Component({
  selector: 'initial-bodyrates',
  templateUrl: './initial-bodyrates.component.html'
})
export class InitialBodyratesComponent extends SubsectionBaseComponent {
  public frameOptions: SelectOption[] = [
    { value: 'ecef', viewValue: 'ECEF' }
  ];

  constructor(protected route: ActivatedRoute) {
    super(route);
  }
}
