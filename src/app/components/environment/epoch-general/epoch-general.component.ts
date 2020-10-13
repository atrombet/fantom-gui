import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubsectionBaseComponent } from '@components/shared';

@Component({
  selector: 'epoch-general',
  templateUrl: './epoch-general.component.html',
  styleUrls: ['./epoch-general.component.scss']
})
export class EpochGeneralComponent extends SubsectionBaseComponent {
  public get epochOn(): boolean {
    if (this.form) {
      return this.form.get('epoch_on').value;
    }
  }

  constructor(protected route: ActivatedRoute) {
    super(route);
  }
}
