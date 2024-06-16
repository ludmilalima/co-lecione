import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/components/admin-user/user.service';
import { switchMap, EMPTY, tap, catchError, finalize } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { User } from '../user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
})
/**
 * Represents the RegisterComponent class.
 * This component is responsible for registering new users.
 */
export class RegisterComponent {
  newUser: User = { name: '', email: '', password: '' };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRegisterRef: MatDialogRef<RegisterComponent>,
    public userService: UserService,
  ) { }

  /**
   * Registers a new user.
   * 
   * @remarks
   * This method checks if the email is already registered. If not, it creates a new user using the provided information.
   * 
   * @param this - The context of the component.
   */
  register(this: any) {
    this.userService.checkEmail(this.newUser.email).pipe(
      switchMap((response: any) => {
        if (response.isEmailRegistered) {
          this._notificationService.info('Email indisponível para cadastro', 'Este e-mail consta no cadastro de outro usuário.');
          // Retorna um observable vazio para encerrar a cadeia
          return EMPTY;
        } else {
          return this.userService.createUser(<User>this.newUser);
        }
      }),
      tap(() => {
        this._notificationService.success('Usuário registrado', 'Usuário registrado com sucesso!');
      }),
      catchError((error: any) => {
        if (error.errors) {
          for (const key in error.errors) {
            if (error.errors.hasOwnProperty(key)) {
              this._notificationService.error('Erro ao registrar usuário', error.errors[key].message);
            }
          }
        } else {
          this._notificationService.error('Erro ao registrar usuário', 'Erro ao registrar usuário. Mais detalhes no console.');
          console.error(error);
        }
        // Retorna um observable vazio para que o erro seja tratado e a cadeia continue
        return EMPTY;
      }),
      finalize(() => {
        this.closeRegisterDialog();
      })
    ).subscribe();
  }

  /**
   * Closes the register dialog.
   */
  closeRegisterDialog() {
    this.dialogRegisterRef.close();
  }
}