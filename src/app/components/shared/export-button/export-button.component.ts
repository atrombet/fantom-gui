import { Component } from '@angular/core';
import { XmlService } from '@services';

@Component({
  selector: 'export-button',
  templateUrl: './export-button.component.html'
})
export class ExportButtonComponent {
  constructor(private xmlService: XmlService) { }

  public onClick(): void {
    this.xmlService.exportXml();
  }
}
