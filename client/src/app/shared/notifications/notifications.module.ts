import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { NotificationsComponent } from './notifications.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    MatSnackBarModule,
    MatIconModule,
    FlexLayoutModule,
    MatTooltipModule,
    MatToolbarModule,
    MatButtonModule
  ],
  declarations: [NotificationsComponent],
  exports: [NotificationsComponent],
})
export class NotificationsModule { }