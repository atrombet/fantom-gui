import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Environment } from '@interfaces';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalComponent } from '@components/shared';
import { first } from 'rxjs/operators';

@Component({
  selector: 'environment-tile',
  templateUrl: './environment-tile.component.html',
  styleUrls: ['./environment-tile.component.scss']
})
export class EnvironmentTileComponent implements OnInit, AfterViewInit {
  @Input() public env: Environment;
  @Output() public nameChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() public duplicate: EventEmitter<Environment> = new EventEmitter<Environment>();
  @Output() public delete: EventEmitter<number> = new EventEmitter<number>();
  @Output() public envSelected: EventEmitter<number> = new EventEmitter<number>();

  @ViewChild('name', { static: false }) public nameElement: ElementRef;
  public nameControl: FormControl;
  public nameEditMode: boolean;

  constructor(public dialog: MatDialog) { }

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
   * Handles a click on the environment tile.
   * @param envId - The id of the selected environment.
   */
  public onEnvSelected(envId: number): void {
    this.envSelected.emit(envId);
  }

  /**
   * Handles a click on the Rename button in the environment tile dropdown menu.
   */
  public onRenameClick(): void {
    this.nameEditMode = true;
    setTimeout(() => this.nameElement.nativeElement.focus());
  }

  /**
   * Emits an event to trigger duplicating this environment.
   */
  public onDuplicateClick(): void {
    this.duplicate.emit(this.env);
  }

  /**
   * Emits an event to trigger deleting this environment.
   */
  public onDeleteClick(): void {
    const dialogRef = this.dialog.open(ConfirmModalComponent, { disableClose: true });

    dialogRef.afterClosed().pipe(first()).subscribe(confirmed => {
      if (confirmed) {
        this.delete.emit(this.env.id);
      }
    });
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
