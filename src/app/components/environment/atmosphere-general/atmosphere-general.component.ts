import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubsectionBaseComponent } from '@components/shared';

@Component({
  selector: 'atmosphere-general',
  templateUrl: './atmosphere-general.component.html',
  styleUrls: ['./atmosphere-general.component.scss']
})
export class AtmosphereGeneralComponent extends SubsectionBaseComponent {
  public get atmoOn(): boolean {
    if (this.form) {
      return this.form.get('atmosphere_on').value;
    }
  }
  constructor(protected route: ActivatedRoute) {
    super(route);
  }
}
