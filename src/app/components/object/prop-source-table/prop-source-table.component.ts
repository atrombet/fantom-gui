import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ParsingService } from '@services';
import { InputTableComponent } from '@components/shared';

@Component({
  selector: 'prop-source-table',
  templateUrl: './prop-source-table.component.html',
  styleUrls: ['../../shared/input-table/input-table.component.scss'],
  providers: [
    ParsingService
  ]
})
export class PropSourceTableComponent extends InputTableComponent {

  constructor(public dialog: MatDialog, protected fb: FormBuilder, protected parser: ParsingService) {
    super(dialog, fb, parser);
  }
}
