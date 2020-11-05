import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Item } from '@interfaces';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { first } from 'rxjs/operators';

@Component({
  selector: 'item-tile',
  templateUrl: './item-tile.component.html',
  styleUrls: ['./item-tile.component.scss']
})
export class ItemTileComponent implements OnInit, AfterViewInit {
  @Input() public item: Item;
  @Input() public panelClass: string;
  @Input() public showAddButton: string;
  @Output() public addItem: EventEmitter<number> = new EventEmitter<number>();
  @Output() public nameChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() public duplicate: EventEmitter<Item> = new EventEmitter<Item>();
  @Output() public delete: EventEmitter<number> = new EventEmitter<number>();
  @Output() public itemSelected: EventEmitter<number> = new EventEmitter<number>();

  @ViewChild('name', { static: false }) public nameElement: ElementRef;
  public nameControl: FormControl;
  public nameEditMode: boolean;

  constructor(public dialog: MatDialog) { }

  /**
   * Angular On Init Lifecycle state
   */
  public ngOnInit(): void {
    this.nameControl = new FormControl(this.item.name, Validators.required);
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
   * Handles a click on the item tile.
   * @param itemId - The id of the selected item.
   */
  public onItemSelected(itemId: number): void {
    this.itemSelected.emit(itemId);
  }

  /**
   * Handles a click on the add button.
   * @param event - The click event
   */
  public onAddButtonClick(event: Event): void {
    event.stopPropagation();
    this.addItem.emit(this.item.id);
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
    this.duplicate.emit(this.item);
  }

  /**
   * Emits an event to trigger deleting this item.
   */
  public onDeleteClick(): void {
    const dialogRef = this.dialog.open(ConfirmModalComponent, { disableClose: true });

    dialogRef.afterClosed().pipe(first()).subscribe(confirmed => {
      if (confirmed) {
        this.delete.emit(this.item.id);
      }
    });
  }

  /**
   * Cancels the editing of the item name.
   */
  public editNameCancel(): void {
    this.nameControl.patchValue(this.item.name);
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
