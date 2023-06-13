import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from '../register/register.component';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent {
  email!: string;
  senha!: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogLoginRef: MatDialogRef<LoginComponent>,
    private dialogRegister: MatDialog,
    private userService: UserService,
  ) { };

  openRegisterDialog(): void {
    this.dialogRegister.open(RegisterComponent);
  };

  acessar() {
    // Lógica para acessar
    this.userService.login(this.email, this.senha).subscribe(() => {
      this.userService.getUserInfo();
    });
    // Fechar dialog de login
    this.dialogLoginRef.close();
  };
}
