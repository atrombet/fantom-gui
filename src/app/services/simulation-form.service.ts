import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SimFields } from '../enums';

@Injectable({
  providedIn: 'root'
})
export class SimulationFormService {
  public simForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.simForm = this.fb.group({
      [SimFields.MaxSimTime]: [null, Validators.required],
      [SimFields.SimName]: ['simulation_001', Validators.required]
    });
  }
}
