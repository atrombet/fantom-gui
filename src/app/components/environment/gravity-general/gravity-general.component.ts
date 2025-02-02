import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubsectionBaseComponent } from '@components/shared';
import { SelectOption } from '@interfaces';

@Component({
  selector: 'gravity-general',
  templateUrl: './gravity-general.component.html'
})
export class GravityGeneralComponent extends SubsectionBaseComponent {
  /**
   * Returns true if gravity is enabled.
   */
  public get gravityOn(): boolean {
    if (this.form) {
      return this.form.get('gravity_on').value;
    }
  }

  // The options for Gravity Model
  public gravityModelOptions: SelectOption[] = [
    { value: 1, viewValue: 'Spherical' },
    { value: 2, viewValue: 'WGS-84 J2' },
    { value: 3, viewValue: 'WGS-84 EGM96' }
  ];

  constructor(protected route: ActivatedRoute) {
    super(route);
  }
}
