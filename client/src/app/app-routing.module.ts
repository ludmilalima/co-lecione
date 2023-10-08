import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeanComponent } from './components/mean/mean.component';
import { AppComponent } from './app.component';
import { MongoComponent } from './components/mongo/mongo.component';
import { AngularJSComponent } from './components/angular-js/angular-js.component';

const routes: Routes = [
  //{ path: '', redirectTo: 'navigation', pathMatch: 'full' },
  { path: 'mean', component: MeanComponent },
  { path: 'mongo', component: MongoComponent },
  { path: 'angularJS', component: AngularJSComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
