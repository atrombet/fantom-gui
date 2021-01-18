import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'subsection-base',
  template: ``
})
export class SubsectionBaseComponent implements OnInit, OnDestroy {
  protected subs: Subscription = new Subscription();

  public form: FormGroup;
  public data: any;

  constructor(protected route: ActivatedRoute) {}

  /**
   * Angular life cycle hook On Init
   */
  public ngOnInit(): void {
    this.subs.add(
      this.route.data.subscribe(data => {
        this.data = data;
        this.form = data.form;
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
