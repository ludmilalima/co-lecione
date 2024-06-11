import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent, DialogData } from '../shared/confirmation-dialog/confirmation-dialog.component';

@Injectable({
    providedIn: 'root'
})
export class ConfirmationDialogService {
    constructor(private dialog: MatDialog) { }

    openDialog(question: string, confirmCallback: () => void, cancelCallback: () => void): void {
        const dialogData: DialogData = { question, confirmCallback, cancelCallback };
        this.dialog.open(ConfirmationDialogComponent, {
            width: '250px',
            data: dialogData
        });
    }
}