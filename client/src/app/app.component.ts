import { Component } from '@angular/core';

export class LoggedUser {
  logged: boolean = false;
  email?: string;
};

@Component({
  selector: 'app-root',
  template: `
    <div>
    <router-outlet></router-outlet>
    </div>
  `,
  styles: []
})
export class AppComponent {
  constructor(
    public loggedUser: LoggedUser
  ) {};
  title = 'LearnBench';
}
