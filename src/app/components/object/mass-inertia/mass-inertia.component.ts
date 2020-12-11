import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SelectOption, TableColumn } from '@interfaces';
import { SubsectionBaseComponent } from '@components/shared';

@Component({
  selector: 'mass-inertia',
  templateUrl: './mass-inertia.component.html',
  styles: [
  ]
})
export class MassInertiaComponent extends SubsectionBaseComponent {
  // The options for inertiaDependencies
  public inertiaDependencies: SelectOption[] = [
    { value: 1, viewValue: 'Time', tableHeaderValue: 'Time [s]' },
    { value: 2, viewValue: 'Mass', tableHeaderValue: 'Mass [kg]' }
  ];

  public columns: TableColumn[] = [
    { variable: 'ixx', headerName: 'Ixx [kg*m^2]' },
    { variable: 'iyy', headerName: 'Iyy [kg*m^2]' },
    { variable: 'izz', headerName: 'Izz [kg*m^2]' },
    { variable: 'ixy', headerName: 'Ixy [kg*m^2]' },
    { variable: 'ixz', headerName: 'Ixz [kg*m^2]' },
    { variable: 'iyz', headerName: 'Iyz [kg*m^2]' }
  ];

  public get depLabel(): string {
    return this.inertiaDependencies.find(dep => dep.value === this.form.get('inertia_dependency').value)?.tableHeaderValue || '';
  }

  constructor(protected route: ActivatedRoute) {
    super(route);
  }
}
