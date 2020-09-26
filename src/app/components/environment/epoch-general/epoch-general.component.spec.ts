import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EpochGeneralComponent } from './epoch-general.component';

describe('EpochGeneralComponent', () => {
  let component: EpochGeneralComponent;
  let fixture: ComponentFixture<EpochGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EpochGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EpochGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
