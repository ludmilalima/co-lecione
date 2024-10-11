import { Component, Input } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-email-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
  ],
  templateUrl: './email-dialog.component.html',
  styleUrl: './email-dialog.component.scss'
})
export class EmailDialogComponent {
  @Input() emailForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EmailDialogComponent>
  ) {
    this.emailForm = this.fb.group({
      destination: ['', [Validators.required, Validators.email]],
      message: ['', ]
    });
  }

  onSubmit(): void {
    if (this.emailForm.valid) {
      this.dialogRef.close(this.emailForm);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
