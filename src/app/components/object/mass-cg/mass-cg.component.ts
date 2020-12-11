import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SelectOption, TableColumn } from '@interfaces';
import { SubsectionBaseComponent } from '@components/shared';
import { ParsingService } from '@services';

@Component({
  selector: 'mass-cg',
  templateUrl: './mass-cg.component.html',
  styleUrls: ['./mass-cg.component.scss'],
  providers: [
    ParsingService
  ]
})
export class MassCgComponent extends SubsectionBaseComponent {

  // The options for cgDependencies
  public cgDependencies: SelectOption[] = [
    { value: 1, viewValue: 'Time', tableHeaderValue: 'Time [s]' },
    { value: 2, viewValue: 'Mass', tableHeaderValue: 'Mass [kg]' }
  ];

  public columns: TableColumn[] = [
    { variable: 'x', headerName: 'X [m]' },
    { variable: 'y', headerName: 'Y [m]' },
    { variable: 'z', headerName: 'Z [m]' }
  ];

  public get depLabel(): string {
    return this.cgDependencies.find(dep => dep.value === this.form.get('cg_dependency').value)?.tableHeaderValue || '';
  }

  constructor(protected route: ActivatedRoute) {
    super(route);
  }
}
