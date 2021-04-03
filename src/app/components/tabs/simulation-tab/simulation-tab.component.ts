import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SimulationFormService, XmlService } from '@services';
import { FormGroup } from '@angular/forms';
import { SimFields } from '@enums';
import { ImportModalComponent } from '@components/shared/import-modal/import-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { SimExecComponent } from '@components/shared/sim-exec/sim-exec.component';
import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'simulation-tab',
  templateUrl: './simulation-tab.component.html',
  styleUrls: ['./simulation-tab.component.scss']
})
export class SimulationTabComponent implements OnInit, OnDestroy {
  private subs: Subscription = new Subscription();
  public simForm: FormGroup;
  public fields = SimFields;

  @ViewChild(SimExecComponent) public simExec: SimExecComponent;

  constructor(private simService: SimulationFormService, public xmlService: XmlService, public dialog: MatDialog) {
    this.simForm = this.simService.simForm;
  }

  public ngOnInit(): void {
    this.subs.add(
      this.xmlService.savedXmlPath.subscribe((path) => {
        this.simExec.setFilepath(path);
      })
    );
  }

  public ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  public openImportModal(): void {
    const dialogRef = this.dialog.open(ImportModalComponent, { disableClose: true });

    dialogRef.afterClosed().pipe(take(1)).subscribe(files => {
      if (files) {
        this.xmlService.importXml(files);
      }
    });
  }

  public onExportClick(): void {
    this.xmlService.exportXml();
  }
}
