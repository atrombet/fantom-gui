import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TAB_ROUTES } from '@constants';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Section, Item } from '@interfaces';
import { PageHeaderComponent } from '@components/shared';
import { version } from '../../package.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public item: Item;
  public sections: Section[];
  public version = version;

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
   * @param item - The newly selected item.
   */
  public setItem(item: Item): void {
    if (item.type !== this.item?.type || item.id !== this.item?.id) {
      this.item = item;
      this.setSections(this.item.sections);
      this.navigateToSection(this.item.sections[0].subsections[0].route);
    }
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
    this.router.navigate([ `${this.item.type}/${this.item.id}/${route}` ]);
  }
}
