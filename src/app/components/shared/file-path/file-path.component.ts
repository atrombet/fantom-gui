import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'file-path',
  templateUrl: './file-path.component.html',
  styleUrls: ['./file-path.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective
    }
  ]
})
export class FilePathComponent implements OnInit {
  @Input() public label = 'Filepath';
  @Input() public controlName: string;
  @Input() public disabled: boolean;
  @ViewChild('filepath', { static: false }) public filePath: ElementRef;

  public file: File | null = null;

  constructor() { }

  ngOnInit(): void {
  }

  public fileButtonClick(): void {
    this.filePath.nativeElement.click();
  }

  public onChangeFileInput(): void {
    const files: { [key: string]: File } = this.filePath.nativeElement.files;
    this.file = files[0];
  }
}
