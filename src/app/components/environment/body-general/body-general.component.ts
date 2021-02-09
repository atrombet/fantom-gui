import { Component, OnInit } from '@angular/core';
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
export class BodyGeneralComponent extends SubsectionBaseComponent implements OnInit {
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

  public ngOnInit(): void {
    super.ngOnInit();
    this.subs.add(
      this.form.get('body_model').valueChanges.subscribe((value => {
        switch (value) {
          case 0:
            // Custom
            this.form.patchValue({
              equatorial_radius: null,
              eccentricity: null
            });
            break;
          case 1:
            // Spherical
            this.form.patchValue({
              equatorial_radius: 6371008.7714,
              eccentricity: 0.0
            });
            break;
          case 2:
            // WGS-84
            this.form.patchValue({
              equatorial_radius: 6378137,
              eccentricity: 0.081819190842622
            });
            break;
        }
      }))
    );
  }
}
