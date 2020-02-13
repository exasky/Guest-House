import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';

import {JwtInterceptor} from './interceptor/jwtInterceptor';

import {AppComponent} from './app.component';
import {IsAuthGuard} from './core/auth/guard/isAuthGuard';
import {MaterialModule} from "./material.module";
import {LoginModule} from "./login/login.module";
import {CoreModule} from "./core/core.module";
import {DashboardModule} from "./dashboard/dashboard.module";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    LoginModule,
    DashboardModule,
    CoreModule.forRoot()
  ],
  entryComponents: [],
  providers: [
    IsAuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
