import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EnvironmentService } from '@services';
import { Environment } from '@interfaces';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'environment-tab',
  templateUrl: './environment-tab.component.html',
  styleUrls: ['./environment-tab.component.scss']
})
export class EnvironmentTabComponent implements OnInit, OnDestroy {
  public environments$: Observable<Environment[]>;
  public selectedEnvId: number;
  private subs: Subscription = new Subscription();

  constructor(private route: ActivatedRoute, private router: Router, private envService: EnvironmentService) { }

  /**
   * Angular On Init Lifecycle hook
   */
  public ngOnInit(): void {
    // this.subs.add(
    //   this.route.params.subscribe(({id}) => {
    //     if (id) {
    //       this.selectedEnvId = parseInt(id, 10);
    //     }
    //   })
    // );
    this.environments$ = this.envService.environments$;
  }

  /**
   * Angular On Destroy Lifecycle hook
   */
  public ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  /**
   * Adds an environment with an auto-generated name to the list of environments.
   */
  public addEnvironment(): void {
    this.envService.addEnvironment();
  }

  /**
   * Calls the environment service to update the name of the environment.
   * @param envId - The ID of the environment to update.
   * @param name - The new name of the environment.
   */
  public updateName(envId: number, name: string): void {
    this.envService.updateEnvName(envId, name);
  }

  /**
   * Calls the env service to trigger a duplication of the given environment
   * @param env - The environment to duplicate.
   */
  public duplicateEnv(env: Environment): void {
    this.envService.duplicateEnv(env);
  }

  /**
   * Calls the env service to trigger deletion of the given environment.
   * @param envId - The id of the environment to delete.
   */
  public deleteEnv(envId: number): void {
    this.envService.deleteEnv(envId);
  }

  public goToEnv(envId: number): void {
    if (envId !== this.selectedEnvId) {
      this.selectedEnvId = envId;
      this.router.navigate([`environment/${envId}`]);
    }
  }
}
