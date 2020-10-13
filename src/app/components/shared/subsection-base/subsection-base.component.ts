import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'subsection-base',
  template: ``
})
export class SubsectionBaseComponent implements OnInit, OnDestroy {
  private subs: Subscription = new Subscription();

  public form: FormGroup;

  constructor(protected route: ActivatedRoute) {}

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
