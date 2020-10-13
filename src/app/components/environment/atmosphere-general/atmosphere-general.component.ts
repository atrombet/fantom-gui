import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubsectionBaseComponent } from '@components/shared';
import { SelectOption } from '@interfaces';

@Component({
  selector: 'atmosphere-general',
  templateUrl: './atmosphere-general.component.html',
  styleUrls: ['./atmosphere-general.component.scss']
})
export class AtmosphereGeneralComponent extends SubsectionBaseComponent {
   // The options for Atmospheric Model
   public atmoModelOptions: SelectOption[] = [
    { value: 0, viewValue: '1976 STD' },
    { value: 1, viewValue: 'From File' }
  ];

  public get atmoOn(): boolean {
    if (this.form) {
      return this.form.get('atmosphere_on').value;
    }
  }
  constructor(protected route: ActivatedRoute) {
    super(route);
  }
}
