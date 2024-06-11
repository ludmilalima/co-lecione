import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

export interface DialogData {
    question: string;
    confirmCallback: () => void;
    cancelCallback: () => void;
}

@Component({
    selector: 'app-confirmation-dialog',
    templateUrl: 'confirmation-dialog.component.html',
    standalone: true,
    imports: [
        MatDialogModule,
        MatButtonModule
    ]
})
export class ConfirmationDialogComponent {
    constructor(
        public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) { }

    onConfirm(): void {
        this.data.confirmCallback();
        this.dialogRef.close();
    }

    onCancel(): void {
        this.data.cancelCallback();
        this.dialogRef.close();
    }
}