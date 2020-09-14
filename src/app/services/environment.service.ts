import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Environment } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {
  public environments$: BehaviorSubject<Environment[]> = new BehaviorSubject<Environment[]>([]);

  private lastId = 0;

  constructor() { }

  /**
   * Adds an environment to the list and auto-generates an appropriate name.
   */
  public addEnvironment(): void {
    const envs = this.environments$.getValue();
    const newId = this.lastId + 1;
    const newEnvs: Environment[] = [
      ...envs,
      {
        id: newId,
        name: `environment_${('000' + newId).slice(-3)}`
      }
    ];
    this.environments$.next(newEnvs);
    this.lastId = newId;
  }

  /**
   * Updates the name of an environement
   * @param envId - The id of the environment to update.
   * @param name - The new name of the environment.
   */
  public updateEnvName(envId: number, name: string): void {
    const updatedEnvs: Environment[] = [ ...this.environments$.getValue() ];
    updatedEnvs.find(env => env.id === envId).name = name;
    this.environments$.next(updatedEnvs);
  }

  /**
   * Duplicates the given environment.
   * @param env - The environment to duplicate.
   */
  public duplicateEnv(env: Environment): void {
    const envs = this.environments$.getValue();
    const envNames = envs.map(e => e.name);
    const nameParts = env.name.split('-');
    // Find the highest dash number. Ex: [env-1, env-4] => highest dash number is 4.
    const max = Math.max(
      ...envNames
        .filter(name => name.indexOf(nameParts[0]) === 0)
        .map(name => name.split('-')[1])
        .filter(numStr => !!numStr)
        .map(numStr => parseInt(numStr, 10))
    );
    const newName = max >= 0 ? `${nameParts[0]}-${max + 1}` : `${env.name}-1`;
    const newId = this.lastId + 1;
    const newEnv: Environment = { ...env, id: newId, name: newName };
    this.environments$.next([ ...envs, newEnv ]);
    this.lastId = newId;
  }

  /**
   * Removes the given environment from the list.
   * @param envId - The ID of the environment to remove.
   */
  public deleteEnv(envId: number): void {
    const envs = this.environments$.getValue();
    const newEnvs = envs.filter(env => env.id !== envId);
    this.environments$.next(newEnvs);
  }
}
