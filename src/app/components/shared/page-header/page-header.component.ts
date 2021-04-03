import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Section, Subsection } from '@interfaces';

@Component({
  selector: 'page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent {
  private _sections: Section[];

  @Input() public set sections(value: Section[]) {
    if (value) {
      this._sections = value;
      this.selectedSection = value[0];
      this.selectedSubsection = this.selectedSection.subsections[0];
    }
  }

  public get sections(): Section[] {
    return this._sections;
  }

  public selectedSection: Section;
  public selectedSubsection: Subsection;

  @Output() public sectionSelected: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  /**
   * Clears all the sections available in the page header.
   */
  public clearHeader(): void {
    this.selectedSection = null;
    this.selectedSubsection = null;
  }

  /**
   * Sets the header options back to first section, first subsection.
   */
  public resetHeader(): void {
    if (this._sections) {
      this.selectedSection = this._sections[0];
      this.selectedSubsection = this.selectedSection.subsections[0];
    }
  }

  /**
   * Handles the selection of a header by the user.
   * @param header - The header to select.
   */
  public selectSection(section: Section, subsectionIndex: number = 0): void {
    // Set the new section.
    this.selectedSection = section;
    // Set the new subsection.
    this.selectedSubsection = this.selectedSection.subsections[subsectionIndex];
    // Pass the subsection's route to the app component for routing.
    this.sectionSelected.emit(this.selectedSubsection.route);
  }
}
