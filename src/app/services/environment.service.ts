import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Environment } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {
  public environments$: BehaviorSubject<Environment[]> = new BehaviorSubject<Environment[]>([]);

  constructor() { }

  /**
   * Adds an environment to the list and auto-generates an appropriate name.
   */
  public addEnvironment(): void {
    const envs = this.environments$.getValue();
    let newEnvs: Environment[];
    if (!!envs.length) {
      // Find the max id, increment it, and create a new env with an auto-generated name.
      const max = Math.max(...envs.map(env => env.id));
      newEnvs = [
        ...envs,
        {
          id: max + 1,
          name: `environment_${('000' + (max + 1)).slice(-3)}`
        }
      ];
    } else {
      // Create the first env.
      newEnvs = [
        ...envs,
        { id: 1, name: 'environment_001' }
      ];
    }
    // Push the new envs to the behavior subject.
    this.environments$.next(newEnvs);
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
}
