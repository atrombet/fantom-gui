import { Component, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubsectionBaseComponent } from '@components/shared';
import { SelectOption } from '@interfaces';
import { ItemService } from '@services';
import { ItemType } from '@enums';

@Component({
  selector: 'aero-general',
  templateUrl: './aero-general.component.html',
  styles: [
  ]
})
export class AeroGeneralComponent extends SubsectionBaseComponent implements AfterViewInit {
  private modeToSubsectionMap = {
    1: 'bodyfixed',
    2: 'axisymmetric',
    3: 'wind'
  };

  public aeroModeOptions: SelectOption[] = [
    { value: 1, viewValue: 'Body-Fixed' },
    { value: 2, viewValue: 'Axisymmetric' },
    { value: 3, viewValue: 'Wind' }
  ];

  constructor(protected route: ActivatedRoute, private itemService: ItemService) {
    super(route);
  }

  public ngAfterViewInit(): void {
    this.updateSubVisForSelectedMode(this.form.get('aero_mode').value);
    this.subs.add(
      this.form.get('aero_mode').valueChanges.subscribe(value => {
        this.updateSubVisForSelectedMode(value);
      })
    );
  }

  private updateSubVisForSelectedMode(mode): void {
    const subsections = Object.keys(this.modeToSubsectionMap).map(key => {
      return {
        name: this.modeToSubsectionMap[key],
        isDisabled: key !== mode.toString()
      };
    });
    this.itemService.updateItemSubsVis(
      ItemType.Object,
      parseInt(this.route.snapshot.params.id, 10),
      subsections,
      'aerodynamics'
    );
  }
}
