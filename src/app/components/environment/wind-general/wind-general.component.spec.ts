import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WindGeneralComponent } from './wind-general.component';

describe('WindGeneralComponent', () => {
  let component: WindGeneralComponent;
  let fixture: ComponentFixture<WindGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WindGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WindGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
