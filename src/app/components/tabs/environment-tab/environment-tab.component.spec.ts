import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvironmentTabComponent } from './environment-tab.component';

describe('EnvironmentTabComponent', () => {
  let component: EnvironmentTabComponent;
  let fixture: ComponentFixture<EnvironmentTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnvironmentTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvironmentTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
