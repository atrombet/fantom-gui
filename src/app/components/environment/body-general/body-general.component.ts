import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubsectionBaseComponent } from '@components/shared';
import { SelectOption } from '@interfaces';

@Component({
  selector: 'body-general',
  templateUrl: './body-general.component.html',
  styles: [`
    .body-column {
      margin-right: 64px;
    }
  `]
})
export class BodyGeneralComponent extends SubsectionBaseComponent {
  public get bodyRotationOn(): boolean {
    if (this.form) {
      return this.form.get('body_rotation_on').value;
    }
  }

  public get disableBodyShape(): boolean {
    if (this.form) {
      return this.form.get('body_model').value !== 0;
    }
  }

  public bodyModelOptions: SelectOption[] = [
    { value: 0, viewValue: 'Custom' },
    { value: 1, viewValue: 'Spherical' },
    { value: 2, viewValue: 'WGS-84' }
  ];

  constructor(protected route: ActivatedRoute) {
    super(route);
  }
}
