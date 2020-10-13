import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'epoch-general',
  templateUrl: './epoch-general.component.html',
  styleUrls: ['./epoch-general.component.scss']
})
export class EpochGeneralComponent implements OnInit, OnDestroy {
  private subs: Subscription = new Subscription();

  public form: FormGroup;

  public get epochOn(): boolean {
    if (this.form) {
      return this.form.get('epoch_on').value;
    }
  }

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
