import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { UserDetailsComponent } from './components/user-details/user-details.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title: string = 'LearnBench';
  iconPath: SafeResourceUrl;
  dialogLoginRef: MatDialogRef<LoginComponent, boolean>;
  dialogLogoutRef: MatDialogRef<LogoutComponent, boolean>;
  dialogUserDetailsRef: MatDialogRef<UserDetailsComponent>;
  isLoggedIn: boolean = false;
  loggedUser: string = '';

  constructor(
    private sanitizer: DomSanitizer,
    private dialogLogin: MatDialog,
    private dialogLogout: MatDialog,
    private dialogUserDetails: MatDialog,
    private breakpointObserver: BreakpointObserver
  ) { };

  ngOnInit(): void {
    this.iconPath = this.sanitizer.bypassSecurityTrustResourceUrl('../assets/logo-title.png');
    this.isLoggedIn = Boolean(localStorage.getItem('token'));
    this.loggedUser = localStorage.getItem('name') || '';
  }

  openLoginDialog(): void {
    this.dialogLoginRef = this.dialogLogin.open(LoginComponent);
    this.handleDialogClose(this.dialogLoginRef, false);
  }

  openLogoutDialog(): void {
    this.dialogLogoutRef = this.dialogLogout.open(LogoutComponent);
    this.handleDialogClose(this.dialogLogoutRef, true);
  }

  openUserDetailsDialog(): void {
    this.dialogUserDetails.open(UserDetailsComponent);
  }

  handleDialogClose(dialogRef: MatDialogRef<any, boolean>, closeResult: boolean): void {
    dialogRef.backdropClick().subscribe(() => {
      dialogRef.close(closeResult);
    });

    dialogRef.afterClosed().subscribe(result => {
      this.isLoggedIn = result;
      if (result) {
        this.loggedUser = localStorage.getItem('name') || '';
      }
    });
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
}