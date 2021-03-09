import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { verifyXmlImport } from '@functions';

@Component({
  selector: 'import-modal',
  templateUrl: './import-modal.component.html'
})
export class ImportModalComponent {
  public readyForImport = false;
  public readyMessage = 'Files are ready for import.';
  public notReadyMessage = 'These files cannot be imported.';
  public files: FileList;

  constructor(public dialogRef: MatDialogRef<ImportModalComponent>) { }

  public onFileInput(files: any): void {
    this.files = files;
    if (verifyXmlImport(files)) {
      this.readyForImport = true;
    }
  }

  public onCancel(): void {
    this.dialogRef.close();
  }

  public onImport(): void {
    this.dialogRef.close(this.files);
  }
}
