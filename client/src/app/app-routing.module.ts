import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationComponent } from './pages/navigation/navigation.component';

const routes: Routes = [
  { path: '', redirectTo: 'navigation', pathMatch: 'full' },
  { path: 'navigation', component: NavigationComponent },
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
