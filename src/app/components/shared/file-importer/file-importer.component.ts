import { Component, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'file-importer',
  templateUrl: './file-importer.component.html'
})
export class FileImporterComponent {
  @Input() public label = '';
  @Input() public disabled = false;
  @ViewChild('filepath', { static: false }) public filePath: ElementRef;

  @Output() public filesSelected = new EventEmitter<any>();

  public files: FileList;

  constructor() { }

  public fileButtonClick(): void {
    this.filePath.nativeElement.click();
  }

  public onChangeFileInput(): void {
    const files: FileList = this.filePath.nativeElement.files;
    this.files = files;
    this.filesSelected.emit(files);
  }
}
