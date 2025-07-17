import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Component, Inject, OnInit } from "@angular/core";
import { LoginComponent } from "./components/admin-user/login/login.component";
import { LogoutComponent } from "./components/admin-user/logout/logout.component";
import { MatDialogRef, MatDialog } from "@angular/material/dialog";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { Observable } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { UserDetailsComponent } from "./components/user-details/user-details.component";
import { WINDOW } from "./shared/services/window.service";
import { environment } from "src/environments/environment";
import { UserService } from "./components/admin-user/user.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title: string = "co-lecione";
  iconPath: SafeResourceUrl;
  dialogLoginRef: MatDialogRef<LoginComponent, boolean>;
  dialogLogoutRef: MatDialogRef<LogoutComponent, boolean>;
  dialogUserDetailsRef: MatDialogRef<UserDetailsComponent>;
  isLoggedIn: boolean = false;
  loggedUser: string = "";

  constructor(
    private sanitizer: DomSanitizer,
    private dialogLogin: MatDialog,
    private dialogLogout: MatDialog,
    private dialogUserDetails: MatDialog,
    private breakpointObserver: BreakpointObserver,
    private _userService: UserService,
    @Inject(WINDOW) private window: Window
  ) { }

  ngOnInit(): void {
    this.iconPath = this.sanitizer.bypassSecurityTrustResourceUrl(
      "../assets/logo-title.png"
    );
    this._userService.checkAuthentication().subscribe(() => {
      this.isLoggedIn = Boolean(localStorage.getItem("token"));
      this.loggedUser = localStorage.getItem("name") || "";
    });
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

  handleDialogClose(
    dialogRef: MatDialogRef<any, boolean>,
    closeResult: boolean
  ): void {
    dialogRef.backdropClick().subscribe(() => {
      dialogRef.close(closeResult);
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.isLoggedIn = result;
      if (result) {
        this.loggedUser = localStorage.getItem("name") || "";
      }
    });
  }

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  navigateToUrl() {
    this.window.location.href = environment.clientUrl;
  }
}
