import { Component, ViewChild, ComponentRef } from '@angular/core';
import { Router } from '@angular/router';
import { TAB_ROUTES } from './constants';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Environment, Section } from './interfaces';
import { PageHeaderComponent } from './components/shared/page-header/page-header.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public item: Environment;
  public sections: Section[];

  @ViewChild(PageHeaderComponent) public pageHeader: PageHeaderComponent;

  constructor(private router: Router) {}

  /**
   * Navigate to the page represented by the selected tab.
   * @param event - Selected Tab Change output event.
   */
  public navigateToTabPage(event: MatTabChangeEvent): void {
    this.router.navigate([ TAB_ROUTES[event.tab.textLabel] ]);
  }

  /**
   * Saves this as the top level "Item" the user is viewing.
   * @param env - The newly selected environment
   */
  public setItem(env: Environment): void {
    this.item = env;
    this.setSections(this.item.sections);
    this.navigateToSection(this.item.sections[0].subsections[0].route);
  }

  /**
   * Sets the sections in the page header.
   * @param sections - The sections of the new selected item.
   */
  public setSections(sections: Section[]): void {
    this.sections = sections;
    this.pageHeader.resetHeader();
  }

  /**
   * Routes to the requested segment.
   * @param route - The last segment of the route to navigate to.
   */
  public navigateToSection(route: string): void {
    this.router.navigate([ `environment/${this.item.id}/${route}` ]);
  }
}
