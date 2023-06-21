import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from '../register/register.component';
import { UserService } from 'src/app/services/user.service';
import { NavigationComponent } from 'src/app/pages/navigation/navigation.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent {
  email!: string;
  senha!: string;

  constructor(
    public dialogLoginRef: MatDialogRef<LoginComponent, boolean>,
    private dialogRegister: MatDialog,
    private userService: UserService,
  ) { };

  openRegisterDialog(): void {
    this.dialogRegister.open(RegisterComponent);
  };

  acessar() {
    // Lógica para acessar
    this.userService.login(this.email, this.senha).subscribe(() => {
      this.userService.getUserInfo().subscribe(response => {
        if (localStorage.getItem('token') != null) {
          this.dialogLoginRef.close(true);
        } else {
          this.dialogLoginRef.close(false);
        }
      });
    });
  };
}
