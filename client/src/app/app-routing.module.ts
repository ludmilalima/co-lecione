import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeanComponent } from './components/mean/mean.component';
import { MongoComponent } from './components/mongo/mongo.component';
import { AngularComponent } from './components/angular-js/angular-js.component';
import { JavascriptComponent } from './components/javascript/javascript.component';
import { CornellComponent } from './components/reusable/cornell/cornell.component';
import { ExploreComponent } from './pages/explore/explore.component';

const routes: Routes = [
  { path: 'mean', component: MeanComponent },
  { path: 'mongo', component: MongoComponent },
  { path: 'angular', component: AngularComponent },
  { path: 'javascript', component: JavascriptComponent },
  { path: 'cornell', component: CornellComponent },
  { path: 'explorar', component: ExploreComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
