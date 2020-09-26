import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ENVIRONMENT_SECTIONS } from '../constants';
import { Environment, Section } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {
  // Store all environments as a map to make them very easy to access by id.
  private envMap$: BehaviorSubject<Map<number, Environment>> =
    new BehaviorSubject<Map<number, Environment>>(new Map<number, Environment>());

  // Store the id that was last used to create an environment.
  private lastId = 0;

  // Returns the stored behavior subject as an observable of Environment[] which is nice to work with on templates.
  public get environments$(): Observable<Environment[]> {
    return this.envMap$.pipe(
      map((envMap: Map<number, Environment>) => {
        return Array.from(envMap.values());
      })
    );
  }

  /**
   * Adds an environment to the list and auto-generates an appropriate name.
   */
  public addEnvironment(): void {
    const newEnvMap = this.cloneEnvMap();
    const newId = this.lastId + 1;
    newEnvMap.set(newId, {
      id: newId,
      name: `environment_${('000' + newId).slice(-3)}`,
      sections: this.envSectionFactory()
    });
    this.envMap$.next(newEnvMap);
    this.lastId = newId;
  }

  /**
   * Updates the name of an environement
   * @param envId - The id of the environment to update.
   * @param name - The new name of the environment.
   */
  public updateEnvName(envId: number, name: string): void {
    const newEnvMap = this.cloneEnvMap();
    const env = newEnvMap.get(envId);
    env.name = name;
    newEnvMap.set(envId, env);
    this.envMap$.next(newEnvMap);
  }

  /**
   * Duplicates the given environment.
   * @param env - The environment to duplicate.
   */
  public duplicateEnv(env: Environment): void {
    const newEnvMap = this.cloneEnvMap();
    const envs = Array.from(newEnvMap.values());
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
    newEnvMap.set(newId, newEnv);
    this.envMap$.next(newEnvMap);
    this.lastId = newId;
  }

  /**
   * Removes the given environment from the list.
   * @param envId - The ID of the environment to remove.
   */
  public deleteEnv(envId: number): void {
    const newEnvMap = this.cloneEnvMap();
    newEnvMap.delete(envId);
    this.envMap$.next(newEnvMap);
  }

  /**
   * Returns an environment by the id.
   * @param envId - The ID of the desired environment.
   */
  public getEnvById(envId: number): Environment {
    const env = this.envMap$.getValue().get(envId);
    return env;
  }

  /**
   * Provides a shallow clone of the environment map. Keeps from mutating the state value.
   * Always use the object this returns instead of trying to modify the envMap value directly.
   */
  private cloneEnvMap(): Map<number, Environment> {
    return new Map(this.envMap$.getValue());
  }

  private envSectionFactory(): Section[] {
    return ENVIRONMENT_SECTIONS;
  }
}
