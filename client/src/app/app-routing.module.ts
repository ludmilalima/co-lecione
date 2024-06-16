import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './features/create/create.component';
import { ExploreComponent } from './features/explore/explore.component';
import { ResumeComponent } from './features/resume/resume.component';

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
