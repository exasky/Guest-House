import {NgModule} from "@angular/core";
import {CoreModule} from "../core/core.module";
import {DashboardComponent} from "./dashboard.component";
import {CommonModule} from "@angular/common";
import {DashboardRoutingModule} from "./dashboard-routing.module";

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    DashboardRoutingModule,
    CoreModule.forRoot(),
    CommonModule
  ],
  entryComponents: [
  ],
  providers: [
  ]
})
export class DashboardModule {

}
