import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Section, Subsection } from '@interfaces';

@Component({
  selector: 'page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {
  @Input() public sections: Section[];

  public selectedSection: Section;
  public selectedSubsection: Subsection;

  constructor(private router: Router) { }

  public ngOnInit(): void {
    // Selects the first header & subheader by default.
    this.selectedSection = this.sections[0];
    this.routeToFirstSubsection();
  }

  /**
   * Handles the selection of a header by the user.
   * @param header - The header to select.
   */
  public selectSection(section: Section): void {
    this.selectedSection = section;
    this.routeToFirstSubsection();
  }

  /**
   * Selects the first subsection of the selected section and routes there.
   */
  private routeToFirstSubsection(): void {
    // Select the first subsection.
    this.selectedSubsection = this.selectedSection.subsections[0];
    // Route to selected subsection component.
    this.router.navigate([ '', { outlets: { page: [this.selectedSubsection.route] } } ]);
  }
}
