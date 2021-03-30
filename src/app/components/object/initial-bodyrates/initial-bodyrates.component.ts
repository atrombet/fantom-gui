import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SelectOption } from '@interfaces';
import { SubsectionBaseComponent } from '@components/shared';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'initial-bodyrates',
  templateUrl: './initial-bodyrates.component.html'
})
export class InitialBodyratesComponent extends SubsectionBaseComponent implements OnInit {
  public frameOptions: SelectOption[] = [
    { value: 'ecef', viewValue: 'ECEF' }
  ];

  constructor(protected route: ActivatedRoute) {
    super(route);
  }

  public ngOnInit(): void {
    super.ngOnInit();
    const frame: FormControl = this.form.controls.frame as FormControl;
    if (!frame.value) {
      this.form.controls.frame.patchValue(this.frameOptions[0].value);
    }
  }
}
