import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class MessageService {
  constructor(private snackbar: MatSnackBar) { }

  public showSuccess(message: string): void {
    this.snackbar.open(message, 'OK', {
      duration: 4000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['snackbar-success']
    });
  }

  public showError(message: string): void {
    this.snackbar.open(message, 'OK', {
      duration: 6000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['snackbar-error']
    });
  }
}
