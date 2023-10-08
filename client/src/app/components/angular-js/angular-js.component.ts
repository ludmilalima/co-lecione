import { Component } from "@angular/core";
import { ThemePalette } from "@angular/material/core";
import { MatTabsModule } from "@angular/material/tabs";

@Component({
  selector: "app-angular-js",
  templateUrl: "./angular-js.component.html",
  styleUrls: ["./angular-js.component.scss"],
})
export class AngularComponent {
  accent: ThemePalette = "accent";
  primary: ThemePalette = "primary";
}
