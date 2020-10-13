import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Environment, SelectOption } from '@interfaces';

@Component({
  selector: 'gravity-general',
  templateUrl: './gravity-general.component.html',
  styleUrls: ['./gravity-general.component.scss']
})
export class GravityGeneralComponent implements OnInit, OnDestroy {
  private subs: Subscription = new Subscription();

  public env: Environment;
  public form: FormGroup;

  public get gravityOn(): boolean {
    if (this.form) {
      return this.form.get('gravity_on').value;
    }
  }

  // The options for Gravity Model
  public gravityModelOptions: SelectOption[] = [
    { value: 0, viewValue: 'Custom' },
    { value: 1, viewValue: 'Spherical' },
    { value: 2, viewValue: 'WGS-84 J2' },
    { value: 3, viewValue: 'WGS-84 EGM96' }
  ];

  constructor(private route: ActivatedRoute) {}

  /**
   * Angular life cycle hook On Init
   */
  public ngOnInit(): void {
    this.subs.add(
      this.route.data.subscribe(({ form }) => {
        this.form = form;
      })
    );
  }

  /**
   * Angular life cycle hook On Destroy
   */
  public ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
