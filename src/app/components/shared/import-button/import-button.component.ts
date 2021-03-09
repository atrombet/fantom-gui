import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { XmlService } from '@services';
import { ImportModalComponent } from '../import-modal/import-modal.component';

@Component({
  selector: 'import-button',
  templateUrl: './import-button.component.html'
})
export class ImportButtonComponent {
  constructor(private xmlService: XmlService, public dialog: MatDialog) { }

  public openModal(): void {
    const dialogRef = this.dialog.open(ImportModalComponent);

    dialogRef.afterClosed().subscribe(files => {
      if (files) {
        this.xmlService.importXml(files);
      }
    });
  }
}
