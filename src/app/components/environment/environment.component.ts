import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ENVIRONMENT_SECTIONS } from '@constants';
import { Environment, Section } from '@interfaces';
import { EnvironmentService } from '@services';

@Component({
  selector: 'environment',
  templateUrl: './environment.component.html',
  styleUrls: ['./environment.component.scss']
})
export class EnvironmentComponent implements OnInit, OnDestroy {
  public envId: number;
  public environment: Environment;
  public sections: Section[] = ENVIRONMENT_SECTIONS;
  public subs: Subscription = new Subscription();

  constructor(private route: ActivatedRoute, private envService: EnvironmentService) { }

  public ngOnInit(): void {
    this.subs.add(
      this.route.params.subscribe(({ id }) => {
        if (id) {
          this.envId = parseInt(id, 10);
          this.environment = this.envService.getEnvById(this.envId);
        }
      })
    );
  }

  public ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
