import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from '../register/register.component';
import { User } from 'src/app/models/user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent {
  email: string | undefined;
  senha: string | undefined;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogLoginRef: MatDialogRef<LoginComponent>,
    private dialogRegister: MatDialog,
  ) { };

  openRegisterDialog(): void {
    this.dialogRegister.open(RegisterComponent);
  };

  acessar() {
    // Lógica para acessar

    // Fechar dialog de login
    this.dialogLoginRef.close();
  };

}
