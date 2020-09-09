import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TAB_ROUTES } from './constants';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'fantom-gui';

  constructor(private router: Router) {}

  /**
   * Navigate to the page represented by the selected tab.
   * @param event - Selected Tab Change output event.
   */
  public navigateToTabPage(event: MatTabChangeEvent): void {
    this.router.navigate([ TAB_ROUTES[event.tab.textLabel] ]);
  }
}
