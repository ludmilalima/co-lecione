import { Component, Inject, } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observer } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarModule,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  newUser: User = { name: '', email: '', password: '' };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRegisterRef: MatDialogRef<RegisterComponent>,
    private _snackBar: MatSnackBar,
    public userService: UserService,
  ) { };

  async register(this: any) {
    //Lógica de registro do usuário aqui
    const isEmailRegistered = this.userService.checkEmail(this.newUser.email)
      .subscribe({
        next:(value) => {
          this.openSnackBar(`User não encontrado!`);
        },
        error: (error) => {
          console.error('Erro ao registrar usuário:', error);
          this.openSnackBar(`Erro ao registrar usuário: ${error}`);
          // Implemente o tratamento de erro adequado
        }, complete() {
          // Função vazia, já que não precisamos dela neste caso
        },
      } as Observer<boolean>);

    if (isEmailRegistered) {
      console.log('O e-mail já está cadastrado.');
    } else {
      this.userService.createUser(this.newUser)
        .subscribe({
          next: () => {
            console.log('Usuário registrado com sucesso!');
            // Implemente o que você deseja fazer após o registro do usuário
          },
          error: (error) => {
            console.error('Erro ao registrar usuário:', error);
            // Implemente o tratamento de erro adequado
          },
          complete: () => {
            // Função vazia, já que não precisamos dela neste caso
          }
        } as Observer<string>);
    }

    // Fechar o dialog após o registro
    this.dialogRegisterRef.close();
  };
  
  
  openSnackBar(message: string){
    this._snackBar.open(message, 'Ok', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
