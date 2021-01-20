import { Component } from '@angular/core';
import { CoefficientTableComponent } from '../coefficient-table/coefficient-table.component';

@Component({
  selector: 'two-dim-coefficient-table',
  templateUrl: './two-dim-coefficient-table.component.html'
})
export class TwoDimCoefficientTableComponent extends CoefficientTableComponent {
  constructor() { super(); }
}
