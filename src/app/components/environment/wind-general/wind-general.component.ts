import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubsectionBaseComponent } from '@components/shared';
import { SelectOption } from '@interfaces';

@Component({
  selector: 'wind-general',
  templateUrl: './wind-general.component.html'
})
export class WindGeneralComponent extends SubsectionBaseComponent {
  // The options for Wind Profile
  public windProfileOptions: SelectOption[] = [
    { value: 0, viewValue: 'Custom' },
    { value: 1, viewValue: 'GRAM-99' }
  ];

  /**
   * Returns TRUE if the wind is enabled.
   */
  public get windOn(): boolean {
    if (this.form) {
      return this.form.get('wind_on').value;
    }
  }

  /**
   * Returns TRUE if the wind profile is set to CUSTOM.
   */
  public get customWind(): boolean {
    if (this.form) {
      return this.form.get('wind_profile').value === 0;
    }
  }

  constructor(protected route: ActivatedRoute) {
    super(route);
  }
}
