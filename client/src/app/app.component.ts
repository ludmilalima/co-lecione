import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, inject } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, map, shareReplay } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'LearnBench';
  private breakpointObserver = inject(BreakpointObserver);
  iconPath: any;
  dialogLoginRef: MatDialogRef<LoginComponent, boolean>;
  dialogLogoutRef: MatDialogRef<LogoutComponent, boolean>;
  isLoggedIn: boolean;
  loggedUser: string;

  constructor(
    private sanitizer: DomSanitizer,
    private dialogLogin: MatDialog,
    private dialogLogout: MatDialog
  ) { };

  ngOnInit() {
    this.iconPath = this.sanitizer.bypassSecurityTrustResourceUrl('../assets/logo-title.png');
    this.isLoggedIn = (localStorage.getItem('token') != null);
    this.loggedUser = (localStorage.getItem('name'));
  }


  openLoginDialog(): void {
    //Abrir dialog de login
    this.dialogLoginRef = this.dialogLogin.open(LoginComponent);

    this.dialogLoginRef.backdropClick().subscribe(() => {
      this.dialogLoginRef?.close(false);
    })

    this.dialogLoginRef.afterClosed().subscribe(result => {
      // Lógica a ser executada quando o diálogo for fechado
      this.isLoggedIn = result;
      if (result == true) {
        this.loggedUser = localStorage.getItem('name');
      }
    });
  }

  openLogoutDialog() {
    this.dialogLogoutRef = this.dialogLogout.open(LogoutComponent);

    this.dialogLogoutRef.backdropClick().subscribe(() => {
      this.dialogLogoutRef?.close(true);
    })

    this.dialogLogoutRef.afterClosed().subscribe(result => {
      // Lógica a ser executada quando o diálogo for fechado
      this.isLoggedIn = result;
    });
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
}
