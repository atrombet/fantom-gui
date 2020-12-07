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

  public ngAfterViewInit(): void {
    this.subs.add(
      this.clipboardParser.valueChanges.pipe(
        filter(value => !!value)
      ).subscribe((value) => {
        this.patchClipboardDataToForm(value);
        this.clipboardParser.reset();
      })
    );
  }

  /*************************************
   * Public Methods
   *************************************/

  public addRow(): void {
    const rows = this.form.controls.rows as FormArray;
    rows.push(
      this.fb.group({ n: null, x: null, y: null, z: null })
    );
  }

  public patchClipboardDataToForm(data): void {
    const parsedData: string[][] = this.parser.parseClipboardData(data);
    const rowFormGroups: FormGroup[] = parsedData.map(row => {
      const [n, x, y, z] = row;
      return this.fb.group({ n, x, y, z });
    });
    this.form.controls.rows = this.fb.array(rowFormGroups);
  }

  public clearParser(): void {
    this.clipboardParser.reset();
  }

  public clearTable(): void {
    const options = {
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

  public getDepLabel(id: number): string {
    return {
      1: 'Time',
      2: 'Mass'
    }[id];
  }
}
