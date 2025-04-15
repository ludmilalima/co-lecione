import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CreateComponent } from "./features/create/create.component";
import { ExploreComponent } from "./features/explore/explore.component";
import { ConsumeComponent } from "./features/consume/consume.component";
import { WelcomeComponent } from "./features/welcome/welcome.component";

const routes: Routes = [
  { path: "", redirectTo: "/welcome", pathMatch: "full" },
  { path: "explorar", component: ExploreComponent },
  { path: "criar", component: CreateComponent },
  { path: "consumir/:id", component: ConsumeComponent },
  { path: "welcome", component: WelcomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
