import { Component } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from '../register/register.component';
import { UserService } from 'src/app/services/user.service';
import { tap, catchError, switchMap, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent {
  email!: string;
  senha!: string;

  constructor(
    public dialogLoginRef: MatDialogRef<LoginComponent, boolean>,
    private dialogRegister: MatDialog,
    private userService: UserService,
    private _notificationService: NotificationsService,
  ) { };

  openRegisterDialog(): void {
    this.dialogRegister.open(RegisterComponent);
  };

  acessar() {
    this.userService.login(this.email, this.senha).pipe(
      switchMap(() => this.userService.getUserInfo()),
      tap((response: any) => {
        this._notificationService.success('Acesso bem-sucedido.', `Bem-vindx, ${response.name}!`);
      }),
      catchError((error: any) => this.handleError(error)),
      finalize(() => this.checkTokenAndCloseDialog())
    ).subscribe();
  };

  private handleError(error: any) {
    if (error.error) {
      this._notificationService.error('Erro ao acessar', error.error);
    } else {
      this._notificationService.error('Erro ao acessar', 'Erro ao acessar. Mais detalhes no console.');
    }
    console.error(error);
    return of(null);
  }

  private checkTokenAndCloseDialog() {
    if (this.userService.getToken() !== null) {
      this.dialogLoginRef.close(true);
    }
  }
}