// tslint:disable: no-string-literal
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubsectionBaseComponent } from '@components/shared';
import { SelectOption } from '@interfaces';
import { Subscription } from 'rxjs';
import { oneDimTable, twoDimTable } from '@constants';

@Component({
  selector: 'aero-page',
  templateUrl: './aero-page.component.html'
})
export class AeroPageComponent extends SubsectionBaseComponent {
  private tableSizeSub: Subscription = new Subscription();

  public selectedCoefficient: string;

  public tableDimOptions: SelectOption[] = [
    { value: 1, viewValue: '1D' },
    { value: 2, viewValue: '2D' }
  ];

  public depOptions: SelectOption[] = [
    { value: 1, viewValue: 'Alpha' },
    { value: 2, viewValue: 'Total Alpha' },
    { value: 3, viewValue: 'Beta' },
    { value: 4, viewValue: 'Aerodynamic Phi' },
    { value: 5, viewValue: 'Mach' },
    { value: 6, viewValue: 'Altitude' }
  ];

  constructor(protected route: ActivatedRoute) {
    super(route);
  }

  public coefficientSelected(id: string): void {
    this.selectedCoefficient = id;
    this.tableSizeSub.unsubscribe();
    this.tableSizeSub = new Subscription().add(
      this.form.get(this.selectedCoefficient).get('size').valueChanges.subscribe((value: number) => {
        // TODO: verify user selection if data exists.
        if (value === 1) {
          this.form.get(this.selectedCoefficient)['controls'].table = oneDimTable();
        } else {
          this.form.get(this.selectedCoefficient)['controls'].table = twoDimTable();
        }
      })
    )
  }
}
