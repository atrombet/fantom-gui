import { Component, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'file-path',
  templateUrl: './file-path.component.html'
})
export class FilePathComponent {
  @Input() public label = '';
  @Input() public disabled = false;
  @ViewChild('filepath', { static: false }) public filePath: ElementRef;

  @Output() public selectedPath = new EventEmitter<string>();

  public files: FileList;

  constructor() { }

  public fileButtonClick(): void {
    this.filePath.nativeElement.click();
  }

  public onChangeFileInput(): void {
    const files: FileList = this.filePath.nativeElement.files;
    this.files = files;
    this.selectedPath.emit('');
  }
}
