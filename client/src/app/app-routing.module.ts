import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeanComponent } from './components/mean/mean.component';
import { MongoComponent } from './components/mongo/mongo.component';
import { AngularComponent } from './components/angular-js/angular-js.component';

const routes: Routes = [
  //{ path: '', redirectTo: 'navigation', pathMatch: 'full' },
  { path: 'mean', component: MeanComponent },
  { path: 'mongo', component: MongoComponent },
  { path: 'angular', component: AngularComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
