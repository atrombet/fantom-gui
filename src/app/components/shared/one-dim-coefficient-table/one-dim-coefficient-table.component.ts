import { Component } from '@angular/core';
import { CoefficientTableComponent } from '../coefficient-table/coefficient-table.component';

@Component({
  selector: 'one-dim-coefficient-table',
  templateUrl: './one-dim-coefficient-table.component.html'
})
export class OneDimCoefficientTableComponent extends CoefficientTableComponent {
  constructor() { super(); }
}
