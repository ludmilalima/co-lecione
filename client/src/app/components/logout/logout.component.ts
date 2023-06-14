import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {
  constructor(
    public dialogLogoutRef: MatDialogRef<LogoutComponent, boolean>,
    private userService: UserService
  ) { };

  sair() {
    // Lógica para sair
    this.userService.logout();

    if (localStorage.getItem('token') != null) {
      this.dialogLogoutRef.close(true);
    } else {
      this.dialogLogoutRef.close(false);
    }
  }
}
