import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { ConfirmModalComponent } from '..';

@Component({
  selector: 'simple-tile',
  templateUrl: './simple-tile.component.html',
  styleUrls: ['./simple-tile.component.scss']
})
export class SimpleTileComponent implements OnInit, AfterViewInit {
  @Input() public name: string;
  @Input() public selected: boolean;
  @Input() public panelClass: string;

  @Output() public nameChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() public duplicate: EventEmitter<string> = new EventEmitter<string>();
  @Output() public delete: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild('name') public nameElement: ElementRef;

  public nameControl: FormControl;
  public nameEditMode: boolean;

  constructor(public dialog: MatDialog) { }

  /**
   * Angular On Init Lifecycle state
   */
  public ngOnInit(): void {
    this.nameControl = new FormControl(this.name, Validators.required);
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
   * Handles a click on the Rename button in the item tile dropdown menu.
   */
  public onRenameClick(): void {
    this.nameEditMode = true;
    setTimeout(() => this.nameElement.nativeElement.focus());
  }

  /**
   * Emits an event to trigger duplicating this item.
   */
  public onDuplicateClick(): void {
    this.duplicate.emit();
  }

  /**
   * Emits an event to trigger deleting this item.
   */
  public onDeleteClick(): void {
    const dialogRef = this.dialog.open(ConfirmModalComponent, { disableClose: true });

    dialogRef.afterClosed().pipe(first()).subscribe(confirmed => {
      if (confirmed) {
        this.delete.emit();
      }
    });
  }

  /**
   * Cancels the editing of the item name.
   */
  public editNameCancel(): void {
    this.nameControl.patchValue(this.name);
    this.nameEditMode = false;
  }

  /**
   * Emits an updated name for the item.
   */
  public updateName(): void {
    if (this.nameControl.valid) {
      this.nameChange.emit(this.nameControl.value);
      this.nameEditMode = false;
    }
  }
}
