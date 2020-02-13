import {ModuleWithProviders, NgModule} from "@angular/core";
import {AuthService} from "./auth/service/auth.service";
import {CentralService} from "./home-services/central.service";

@NgModule({
  declarations: [],
  imports: [],
  entryComponents: [],
  providers: []
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [AuthService, CentralService]
    };
  }
}
