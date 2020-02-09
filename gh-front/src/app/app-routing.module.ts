import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {IsAuthGuard} from "./guard/isAuthGuard";
import {DashboardComponent} from "./components/dashboard/dashboard.component";


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'dashboard', canActivate: [IsAuthGuard], component: DashboardComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [
    IsAuthGuard
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
