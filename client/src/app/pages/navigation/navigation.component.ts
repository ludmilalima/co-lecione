import { Component, OnInit, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from 'src/app/components/login/login.component';
import { LogoutComponent } from 'src/app/components/logout/logout.component';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})

export class NavigationComponent implements OnInit {
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
    this.iconPath = this.sanitizer.bypassSecurityTrustResourceUrl('../../assets/logo-title.png');
    this.isLoggedIn = (localStorage.getItem('token') != null);
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
