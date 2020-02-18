import {NgModule} from "@angular/core";
import {CoreModule} from "../core/core.module";
import {DashboardComponent} from "./dashboard.component";
import {CommonModule} from "@angular/common";
import {DashboardRoutingModule} from "./dashboard-routing.module";
import {LightCardComponent} from "./light/component/light-card.component";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatSliderModule} from "@angular/material/slider";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MccColorPickerModule} from "material-community-components";
import {MatInputModule} from "@angular/material/input";

@NgModule({
  declarations: [
    DashboardComponent,
    LightCardComponent
  ],
  imports: [
    DashboardRoutingModule,
    CoreModule.forRoot(),
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatSliderModule,
    FormsModule,
    MccColorPickerModule.forRoot({}),
    MatInputModule,
    ReactiveFormsModule
  ],
  entryComponents: [
  ],
  providers: [
  ]
})
export class DashboardModule {

}
