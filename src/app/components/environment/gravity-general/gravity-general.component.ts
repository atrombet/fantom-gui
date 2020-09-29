import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Environment } from '../../../interfaces';
import { EnvironmentService } from '../../../services';

@Component({
  selector: 'gravity-general',
  templateUrl: './gravity-general.component.html',
  styleUrls: ['./gravity-general.component.scss']
})
export class GravityGeneralComponent implements OnInit, OnDestroy {
  private subs: Subscription = new Subscription();

  public env: Environment;
  public form: FormGroup;

  constructor(private route: ActivatedRoute, private envService: EnvironmentService) {}

  /**
   * Angular life cycle hook On Init
   */
  public ngOnInit(): void {
    this.subs.add(
      this.route.params.subscribe(({ id }) => {
        this.env = this.envService.getEnvById(parseInt(id, 10));
        if (this.env) {
          this.form = this.env.sections
          .find(section => section.name === 'gravity')
          .subsections
          .find(subsection => subsection.name === 'general')
          .form;
        }
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
