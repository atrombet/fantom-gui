import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SelectOption } from '@interfaces';
import { SubsectionBaseComponent } from '@components/shared';
import { BODYRATES_OPTIONS } from '@constants';
@Component({
  selector: 'initial-bodyrates',
  templateUrl: './initial-bodyrates.component.html'
})
export class InitialBodyratesComponent extends SubsectionBaseComponent {
  public frameOptions: SelectOption[] = BODYRATES_OPTIONS;

  constructor(protected route: ActivatedRoute) {
    super(route);
  }
}
