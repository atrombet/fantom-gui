import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvironmentTileComponent } from './environment-tile.component';

describe('EnvironmentTileComponent', () => {
  let component: EnvironmentTileComponent;
  let fixture: ComponentFixture<EnvironmentTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnvironmentTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvironmentTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
