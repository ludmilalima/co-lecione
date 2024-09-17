import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './features/create/create.component';
import { ExploreComponent } from './features/explore/explore.component';
import { ConsumeComponent } from './features/consume/consume.component';

const routes: Routes = [
  { path: '', redirectTo: '/explorar', pathMatch: 'full'},
  { path: 'explorar', component: ExploreComponent },
  { path: 'criar', component: CreateComponent },
  { path: 'consumir/:id', component: ConsumeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
