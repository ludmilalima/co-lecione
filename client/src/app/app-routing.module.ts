import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExploreComponent } from './pages/explore/explore.component';
import { CreateComponent } from './pages/create/create.component';
import { ResumeComponent } from './pages/resume/resume.component';

const routes: Routes = [
  { path: 'explorar', component: ExploreComponent },
  { path: 'criar', component: CreateComponent },
  { path: 'retomar', component: ResumeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
