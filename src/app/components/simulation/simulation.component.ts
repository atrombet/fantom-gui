import { Component, OnInit } from '@angular/core';
import { XmlService } from '@services';
import { Observable } from 'rxjs';

@Component({
  selector: 'simulation',
  templateUrl: './simulation.component.html'
})
export class SimulationComponent implements OnInit {
  public xml$: Observable<string>;

  constructor(private xmlService: XmlService) {}

  public ngOnInit(): void {
    this.xml$ = this.xmlService.xml$;
  }

  public onExecuteClick(): void {
    this.xmlService.triggerExecutionCommand();
  }
}
