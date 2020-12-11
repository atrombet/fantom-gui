import { Component, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SelectOption, ConfirmModalOptions } from '@interfaces';
import { SubsectionBaseComponent } from '@components/shared';
import { filter, first } from 'rxjs/operators';
import { ParsingService } from '@services';
import { ConfirmModalComponent } from '@components/shared';

@Component({
  selector: 'mass-cg',
  templateUrl: './mass-cg.component.html',
  styleUrls: ['./mass-cg.component.scss'],
  providers: [
    ParsingService
  ]
})
export class MassCgComponent extends SubsectionBaseComponent implements AfterViewInit {
  public clipboardParser = new FormControl('');

  // The options for cgDependencies
  public cgDependencies: SelectOption[] = [
    { value: 1, viewValue: 'Time' },
    { value: 2, viewValue: 'Mass' }
  ];

  public parserPlaceholder = 'Paste clipboard data here to populate table.';
  public parserTooltip =  `Copy data from a spreadsheet and paste into this input.\n
    Table data will be reset with each new input.\n
    Input expects 4 columns and at least 1 row.\n
    Numbers must be formatted to exact precision.
    `

  constructor(
    protected route: ActivatedRoute,
    private fb: FormBuilder,
    private parser: ParsingService,
    public dialog: MatDialog
  ) {
    super(route);
  }

  /*************************************
   * Angular Lifecycle hooks
   *************************************/

  /**
   * Angular lifecycle hook After View Init
   */
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

  /*************************************
   * Public Methods
   *************************************/

  /**
   * Adds a row to this page's "rows" form array.
   */
  public addRow(): void {
    const rows = this.form.controls.rows as FormArray;
    rows.push(
      this.fb.group({ n: null, x: null, y: null, z: null })
    );
  }

  /**
   * Removes a row from this page's "rows" form array.
   */
  public removeRow(index: number): void {
    const rows = this.form.controls.rows as FormArray;
    rows.removeAt(index);
  }

  /**
   * Handles input into the parser input.
   * @param data - The value entered into the parser input field.
   */
  public handleParserInput(data: string): void {
    if (this.form.get('rows').dirty) {
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
    const parsedData: string[][] = this.parser.parseClipboardData(data);
    const rowFormGroups: FormGroup[] = parsedData.map(row => {
      const [n, x, y, z] = row;
      return this.fb.group({ n, x, y, z });
    });
    this.form.controls.rows = this.fb.array(rowFormGroups);
    this.form.controls.rows.markAsDirty();
  }

  /**
   * Clears the parser input field on the UI of any displayed text.
   */
  public clearParser(): void {
    this.clipboardParser.reset();
  }

  /**
   * Clears all data in the table and marks the "rows" form as clean.
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
        this.form.controls.rows.reset();
      }
    });
  }

  /**
   * Returns a display value based on the selected id in the cg_dependency form control field.
   * @param id - the ID of the selected dependency value.
   */
  public getDepLabel(id: number): string {
    return {
      1: 'Time [s]',
      2: 'Mass [kg]'
    }[id];
  }
}
