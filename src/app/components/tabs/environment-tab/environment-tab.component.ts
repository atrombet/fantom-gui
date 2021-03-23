import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ItemService } from '@services';
import { Item } from '@interfaces';
import { Observable, Subscription } from 'rxjs';
import { ItemType } from '@enums';

@Component({
  selector: 'environment-tab',
  templateUrl: './environment-tab.component.html'
})
export class EnvironmentTabComponent implements OnInit, OnDestroy {
  public environments$: Observable<Item[]>;
  public selectedEnvId: number;

  @Output() public envSelected: EventEmitter<Item> = new EventEmitter<Item>();

  private subs: Subscription = new Subscription();

  constructor(private service: ItemService) { }

  /********************************
   * Angular Life cycle hooks
   ********************************/

  /**
   * Angular On Init Lifecycle hook
   */
  public ngOnInit(): void {
    this.environments$ = this.service.environments$;
  }

  /**
   * Angular On Destroy Lifecycle hook
   */
  public ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  /********************************
   * Public Methods
   ********************************/

  /**
   * Adds an environment with an auto-generated name to the list of environments.
   */
  public addEnvironment(): void {
    this.service.addItem(ItemType.Environment);
  }

  /**
   * Calls the item service to update the name of the environment.
   * @param envId - The ID of the environment to update.
   * @param name - The new name of the environment.
   */
  public updateName(envId: number, name: string): void {
    this.service.updateItemName(ItemType.Environment, envId, name);
  }

  /**
   * Calls the item service to trigger a duplication of the given environment
   * @param env - The environment to duplicate.
   */
  public duplicateEnv(env: Item): void {
    this.service.duplicateItem(env);
  }

  /**
   * Calls the item service to trigger deletion of the given environment.
   * @param envId - The id of the environment to delete.
   */
  public deleteEnv(envId: number): void {
    this.service.deleteItem(ItemType.Environment, envId);
  }

  /**
   * Go to the selected environment.
   * @param envId - Id of the environment
   */
  public goToEnv(envId: number): void {
    const env = this.service.getItemById(ItemType.Environment, envId);
    this.envSelected.emit(env);
    this.selectedEnvId = envId;
  }

  /**
   * Resets the selected environment id.
   */
  public resetSelected(): void {
    this.selectedEnvId = null;
  }
}
