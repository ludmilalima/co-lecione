import { Component, OnInit, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from 'src/app/components/login/login.component';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})

export class NavigationComponent implements OnInit {
  private breakpointObserver = inject(BreakpointObserver);
  iconPath: any;

  constructor(
    private sanitizer: DomSanitizer,
    private dialogLogin: MatDialog
  ) { };

  ngOnInit() {
    this.iconPath = this.sanitizer.bypassSecurityTrustResourceUrl('../../assets/logo-title.png');
    window.addEventListener('storage', function(event) {
      if (event.storageArea === localStorage) {
        // Ação a ser executada quando houver alteração no localStorage
        console.log('O localStorage foi alterado:', event.key, event.newValue);
      }
    });
  }

  openLoginDialog(): void {
    //Abrir dialog de login
    this.dialogLogin.open(LoginComponent);
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
}
