import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/components/admin-user/user.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
  ]
})
export class LogoutComponent {
  constructor(
    public dialogLogoutRef: MatDialogRef<LogoutComponent, boolean>,
    private userService: UserService
  ) { };

  sair() {
    this.userService.logout().subscribe(() => {
      if (localStorage.getItem('token') != null) {
      this.dialogLogoutRef.close(true);
      } else {
      this.dialogLogoutRef.close(false);
      }
    });
  }
}
