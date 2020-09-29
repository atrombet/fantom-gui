import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GravityGeneralComponent } from './gravity-general.component';

describe('GravityGeneralComponent', () => {
  let component: GravityGeneralComponent;
  let fixture: ComponentFixture<GravityGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GravityGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GravityGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
