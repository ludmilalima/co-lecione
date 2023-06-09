import { Component, Inject, } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observer } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: User,
    public dialogRegisterRef: MatDialogRef<RegisterComponent>,
    public userService: UserService,
  ) { };

  register(): void {
    //Lógica de registro do usuário aqui
    this.userService.createUser(this.data)
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
    // Fechar o dialog após o registro
    this.dialogRegisterRef.close();
  };
}
