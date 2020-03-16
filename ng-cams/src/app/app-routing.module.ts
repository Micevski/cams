import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {AccidentComponent} from "./pages/accident/accident.component";
import {AuthenticationGuard} from "./guards/authentication-guard";
import {LoginComponent} from "./pages/login/login.component";


const routes: Routes = [
  {
    path: '', canActivateChild: [AuthenticationGuard], children: [
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'home', component: HomeComponent},
      {path: 'accident/create', component: AccidentComponent}
    ]
  },
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
