import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Environment } from '../../../interfaces';

@Component({
  selector: 'environment-tile',
  templateUrl: './environment-tile.component.html',
  styleUrls: ['./environment-tile.component.scss']
})
export class EnvironmentTileComponent implements OnInit, AfterViewInit {
  @Input() public env: Environment;
  @Output() public nameChange: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('name', { static: false }) public nameElement: ElementRef;
  public nameControl: FormControl;
  public nameEditMode: boolean;

  constructor() { }

  /**
   * Angular On Init Lifecycle state
   */
  public ngOnInit(): void {
    this.nameControl = new FormControl(this.env.name, Validators.required);
    this.nameEditMode = true;
  }

  /**
   * Angular After View Init Lifecycle state
   */
  public ngAfterViewInit(): void {
    if (this.nameEditMode) {
      this.nameElement.nativeElement.focus();
    }
  }

  /**
   * Handles a click on the Rename button in the environment tile dropdown menu.
   */
  public onRenameClick(): void {
    this.nameEditMode = true;
    setTimeout(() => this.nameElement.nativeElement.focus());
  }

  /**
   * Cancels the editing of the evironment name.
   */
  public editNameCancel(): void {
    this.nameControl.patchValue(this.env.name);
    this.nameEditMode = false;
  }

  /**
   * Emits an updated name for the environment.
   */
  public updateName(): void {
    if (this.nameControl.valid) {
      this.nameChange.emit(this.nameControl.value);
      this.nameEditMode = false;
    }
  }
}
