import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmModalOptions } from '../../interfaces';

@Component({
  selector: 'confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {
  private defaults: ConfirmModalOptions = {
    title: 'Confirm Delete',
    message: 'Are you sure you want to delete this?',
    confirmText: 'Delete',
    cancelText: 'Cancel'
  };

  constructor(
    public dialogRef: MatDialogRef<ConfirmModalComponent>,
    @Inject(MAT_DIALOG_DATA) public options: ConfirmModalOptions
  ) { }

  public ngOnInit(): void {
    this.options = {
      ...this.defaults,
      ...this.options
    };
  }

  public onCancel(): void {
    this.dialogRef.close(false);
  }

  public onConfirm(): void {
    this.dialogRef.close(true);
  }

}
