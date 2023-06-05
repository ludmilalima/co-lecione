import { Component, OnInit, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  private breakpointObserver = inject(BreakpointObserver);
  iconPath: any;

  constructor(private sanitizer: DomSanitizer) {};

  ngOnInit() {
    this.iconPath = this.sanitizer.bypassSecurityTrustResourceUrl('../../assets/logo-title.png');
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
}
