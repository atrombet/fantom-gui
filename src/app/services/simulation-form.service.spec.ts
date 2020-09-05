import { TestBed } from '@angular/core/testing';

import { SimulationFormService } from './simulation-form.service';

describe('SimulationFormService', () => {
  let service: SimulationFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SimulationFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
