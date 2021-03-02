import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { XmlService } from '@services';

@Component({
  selector: 'export-button',
  templateUrl: './export-button.component.html'
})
export class ExportButtonComponent {
  constructor(private xmlService: XmlService, public dialog: MatDialog) { }

  public onClick(): void {
    this.xmlService.exportXml();
  }
}
