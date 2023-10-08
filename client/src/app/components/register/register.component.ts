import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  newUser: User = { name: '', email: '', password: '' };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRegisterRef: MatDialogRef<RegisterComponent>,
    private _snackBar: MatSnackBar,
    public userService: UserService,
  ) { }

  register(this: any) {

    try {
      // Código que pode gerar uma exceção
      this.userService.checkEmail(this.newUser.email).subscribe((response: any) => {
        if (response.isEmailRegistered == true) {
          console.log('O e-mail já está cadastrado.');
          this.openSnackBar('O e-mail já está cadastrado.');
        } else {
          this.userService.createUser(<User>this.newUser)
            .subscribe({
              next: () => {
                console.log('Usuário registrado com sucesso!');
                // Implemente o que você deseja fazer após o registro do usuário
              },
              error: (error: any) => {
                // Implemente o tratamento de erro adequado
                this.openSnackBar(error.error);
              },
              complete: () => {
                // Função vazia, já que não precisamos dela neste caso
              }
            });
        }
      })
    } catch (error) {
      // Lidar com o erro
      console.error('Ocorreu um erro na verificação do email:', error);
      this.openSnackBar(`Ocorreu um erro na verificação do email: ${error}`);
    }
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Ok', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}