import { AfterViewInit, Component, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ParsingService } from '@services';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { filter, first } from 'rxjs/operators';
import { ConfirmModalOptions } from '@interfaces';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';

@Component({
  selector: 'two-dim-input-table',
  templateUrl: './two-dim-input-table.component.html',
  styleUrls: ['./two-dim-input-table.component.scss'],
  providers: [ ParsingService ]
})
export class TwoDimInputTableComponent implements AfterViewInit, OnDestroy {
  private subs: Subscription = new Subscription();

  @Input() public colDep: string;
  @Input() public rowDep: string;
  @Input() public columns: FormArray;
  @Input() public rows: FormArray;
  @Input() public data: FormArray;

  public clipboardParser = new FormControl('');
  public parserPlaceholder = 'Paste clipboard data here to populate table.';

  constructor(public dialog: MatDialog, private fb: FormBuilder, private parser: ParsingService) { }

  public ngAfterViewInit(): void {
    this.subs.add(
      this.clipboardParser.valueChanges.pipe(
        filter(value => !!value)
      ).subscribe((value: string) => {
        this.handleParserInput(value);
        this.clipboardParser.reset();
      })
    )
  }

  public ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  /******************************
   * Public Methods
   ******************************/

  /**
   * Adds a new column to the grid.
   */
  public addColumn(): void {
    this.columns.push(this.fb.control(''));
    this.data.controls.forEach((row: FormArray) => {
      row.push(this.fb.control(''))
    });
  }

  /**
   * Adds a new row to the grid.
   */
  public addRow(): void {
    this.rows.push(this.fb.control(''));
    this.data.push(this.fb.array(this.columns.value.map(() => this.fb.control(''))));
  }

  /**
   * Removes a row from the data by its index.
   * @param index - The index of the row to remove.
   */
  public removeRow(index: number): void {
    this.rows.removeAt(index);
    this.data.removeAt(index);
  }

  /**
   * Clears the table after confirmation from the user.
   */
  public clearTable(): void {
    const options: ConfirmModalOptions = {
      title: 'Confirm Clear Table',
      message: 'Are you sure you want to clear all table data? This cannot be undone.',
      confirmText: 'Clear Data',
      cancelText: 'Cancel'
    }
    const dialogRef = this.dialog.open(ConfirmModalComponent, { data: options, disableClose: true });
    dialogRef.afterClosed().pipe(first()).subscribe(confirmed => {
      if (confirmed) {
        // Clear all controls from columns, rows, and data.
        this.columns.clear();
        this.rows.clear();
        this.data.clear();
        // Reset form arrays to make them pristine.
        this.columns.reset();
        this.rows.reset();
        this.data.reset();
      }
    });
  }

  /**
   * Handles input into the parser input.
   * @param data - The value entered into the parser input field.
   */
  public handleParserInput(data: string): void {
    if (this.data.dirty) {
      const options: ConfirmModalOptions = {
        title: 'Confirm Override Table Data',
        message: 'This action will override all table data and cannot be undone. Are you sure you want to continue?',
        confirmText: 'Override Data',
        cancelText: 'Cancel'
      }
      const dialogRef = this.dialog.open(ConfirmModalComponent, { data: options, disableClose: true });
      dialogRef.afterClosed().pipe(first()).subscribe(confirmed => {
        if (confirmed) {
          this.patchClipboardDataToForm(data);
        }
      });
    } else {
      this.patchClipboardDataToForm(data);
    }
  }

  /**
   * Parses the input data and patches the form array with all the input rows.
   * @param data - The value entered into the parser input field.
   */
  public patchClipboardDataToForm(data: string): void {
    // Clear all controls from columns, rows, and data.
    this.columns.clear();
    this.rows.clear();
    this.data.clear();

    // Parse the data with the parsing service.
    const parsedData: string[][] = this.parser.parseClipboardData(data);

    // Set the column headers
    const newColumns = parsedData[0].slice(1);
    newColumns.forEach((col, index) => {
      this.columns.setControl(index, this.fb.control(col));
    });
    this.columns.markAsDirty();

    // Set the rows
    const newRows = parsedData.slice(1);
    newRows.map(row => row[0]).forEach((row, index) => {
      this.rows.setControl(index, this.fb.control(row));
    });
    this.rows.markAsDirty();

    // Set the data
    const newData = parsedData.slice(1).map(row => row.slice(1));
    newData.forEach((dataRow, index) => {
      this.data.setControl(index, this.fb.array(dataRow.map(val => this.fb.control(val))));
    })
    this.data.markAsDirty();
  }

}
