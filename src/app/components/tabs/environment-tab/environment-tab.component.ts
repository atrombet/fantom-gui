import { Component, OnInit } from '@angular/core';
import { EnvironmentService } from '../../../services';
import { Environment } from '../../../interfaces';
import { Observable } from 'rxjs';

@Component({
  selector: 'environment-tab',
  templateUrl: './environment-tab.component.html',
  styleUrls: ['./environment-tab.component.scss']
})
export class EnvironmentTabComponent implements OnInit {
  public environments$: Observable<Environment[]>;

  constructor(private envService: EnvironmentService) { }

  /**
   * Angular On Init Lifecycle hook
   */
  public ngOnInit(): void {
    this.environments$ = this.envService.environments$;
  }

  /**
   * Adds an environment with an auto-generated name to the list of environments.
   */
  public addEnvironment(): void {
    this.envService.addEnvironment();
  }
}
