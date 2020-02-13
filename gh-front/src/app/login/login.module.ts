import {NgModule} from "@angular/core";
import {LoginComponent} from "./component/login.component";
import {CoreModule} from "../core/core.module";
import {LoginRoutingModule} from "./login-routing.module";
import {MatCardModule} from "@angular/material/card";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {CommonModule} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    LoginRoutingModule,
    CoreModule.forRoot(),
    CommonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule
  ],
  entryComponents: [
  ],
  providers: [
  ]
})
export class LoginModule {

}
