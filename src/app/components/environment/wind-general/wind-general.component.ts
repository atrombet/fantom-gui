import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubsectionBaseComponent } from '@components/shared';
import { SelectOption } from '@interfaces';

@Component({
  selector: 'wind-general',
  templateUrl: './wind-general.component.html',
  styleUrls: ['./wind-general.component.scss']
})
export class WindGeneralComponent extends SubsectionBaseComponent {
  // The options for Wind Profile
  public windProfileOptions: SelectOption[] = [
    { value: 0, viewValue: 'Custom' },
    { value: 1, viewValue: 'GRAM-99' }
  ];

  public get windOn(): boolean {
    if (this.form) {
      return this.form.get('wind_on').value;
    }
  }

  constructor(protected route: ActivatedRoute) {
    super(route);
  }
}
