import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulationTabComponent } from './simulation-tab.component';

describe('SimulationTabComponent', () => {
  let component: SimulationTabComponent;
  let fixture: ComponentFixture<SimulationTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimulationTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimulationTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
