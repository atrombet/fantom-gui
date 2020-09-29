import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtmosphereGeneralComponent } from './atmosphere-general.component';

describe('AtmosphereGeneralComponent', () => {
  let component: AtmosphereGeneralComponent;
  let fixture: ComponentFixture<AtmosphereGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtmosphereGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtmosphereGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
