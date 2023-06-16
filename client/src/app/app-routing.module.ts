import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeanComponent } from './components/mean/mean.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  //{ path: '', redirectTo: 'navigation', pathMatch: 'full' },
  { path: 'mean', component: MeanComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
