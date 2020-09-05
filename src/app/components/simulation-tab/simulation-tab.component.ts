import { Component } from '@angular/core';
import { SimulationFormService } from '../../services';
import { FormGroup } from '@angular/forms';
import { SimFields } from '../../enums';

@Component({
  selector: 'simulation-tab',
  templateUrl: './simulation-tab.component.html',
  styleUrls: ['./simulation-tab.component.scss']
})
export class SimulationTabComponent {
  public simForm: FormGroup;
  public fields = SimFields;

  constructor(private simService: SimulationFormService) {
    this.simForm = this.simService.simForm;
  }
}
