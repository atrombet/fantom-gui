import { AfterViewInit, Component, Input, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalOptions, TableColumn } from '@interfaces';
import { ParsingService } from '@services';
import { Subscription } from 'rxjs';
import { filter, first } from 'rxjs/operators';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';

@Component({
  selector: 'input-table',
  templateUrl: './input-table.component.html',
  styleUrls: ['./input-table.component.scss']
})
export class InputTableComponent implements AfterViewInit, OnDestroy {
  private subs: Subscription = new Subscription();

  @Input() public columns: TableColumn[];
  @Input() public depName: string;
  @Input() public rows: FormArray;

  public clipboardParser = new FormControl('');
  public parserPlaceholder = 'Paste clipboard data here to populate table.';

  constructor(public dialog: MatDialog, private fb: FormBuilder, private parser: ParsingService) { }

  /******************************
   * Angular Lifecycle Hooks
   ******************************/

  public ngAfterViewInit(): void {
    this.subs.add(
      this.clipboardParser.valueChanges.pipe(
        filter(value => !!value)
      ).subscribe((value: string) => {
        this.handleParserInput(value);
        this.clipboardParser.reset();
      })
    );
  }

  public ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  /******************************
   * Public Methods
   ******************************/

  /**
   * Returns the table header value of the dependency option with the selected id.
   * @param id - The value of the selected dependency
   */
  // public getDepLabel(id: number): string { 
  //   return this.depOptions.find(option => option.value === id).tableHeaderValue;
  // }

  /**
   * Adds a new row to the row FormArray based on the columns supplied to this component.
   */
  public addRow(): void {
    const initColData = this.columns.reduce((obj, col) => {
      return { ...obj, [col.variable]: null }
    }, {});
    this.rows.push(this.fb.group({ dep: null, ...initColData }));
  }

  /**
   * Removes a row from the data by its index.
   * @param index - The index of the row to remove.
   */
  public removeRow(index: number): void {
    this.rows.removeAt(index);
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
        this.rows.reset();
      }
    });
  }

  /**
   * Handles input into the parser input.
   * @param data - The value entered into the parser input field.
   */
  public handleParserInput(data: string): void {
    if (this.rows.dirty) {
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
    // Parse the data with the parsing service.
    const parsedData: string[][] = this.parser.parseClipboardData(data);
    // Iterate over each row in the parsed data.
    const rowFormGroups: FormGroup[] = parsedData.map(row => {
      // Generate an array of the variables names for the columns in this table instance.
      const colVariables: string[] = this.columns.map(col => col.variable);
      // Add 'dep' to the beginning of the variables names array.
      colVariables.unshift('dep');
      // Combine the parsed row data with the corresponding variable name (assumes parsed data is in ltr order).
      const newRow = colVariables.reduce((group, col, index) => {
        return { ...group, [col]: row[index] };
      }, {});
      // Create a form group from the newRow object.
      return this.fb.group(newRow);
    });
    // Replace the rows form array with the data that been parsed into an array of FormGroups.
    this.rows = this.fb.array(rowFormGroups);
    // Mark the form array as dirty so we know the table has data.
    this.rows.markAsDirty();
  }
  
  /**
   * Clears the parser input field on the UI of any displayed text.
   */
  public clearParser(): void {
    this.clipboardParser.reset();
  }
}
