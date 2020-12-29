import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Section, Subsection } from '@interfaces';

@Component({
  selector: 'section-button',
  templateUrl: './section-button.component.html',
  styleUrls: ['./section-button.component.scss']
})
export class SectionButtonComponent {
  @Input() public section: Section | Subsection;
  @Output() public sectionSelected: EventEmitter<void> = new EventEmitter<void>();
}
