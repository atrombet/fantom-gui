import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
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

  @Output() public envSelected: EventEmitter<Environment> = new EventEmitter<Environment>();

  private subs: Subscription = new Subscription();

  constructor(private envService: EnvironmentService) { }

  /**
   * Angular On Init Lifecycle hook
   */
  public ngOnInit(): void {
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

  /**
   * Go to the selected environment.
   * @param envId - Id of the environment
   */
  public goToEnv(envId: number): void {
    if (envId !== this.selectedEnvId) {
      const env = this.envService.getEnvById(envId);
      this.envSelected.emit(env);
      this.selectedEnvId = envId;
    }
  }
}
