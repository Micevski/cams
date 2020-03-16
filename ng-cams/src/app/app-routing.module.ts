import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {AccidentComponent} from "./pages/accident/accident.component";
import {AuthenticationGuard} from "./guards/authentication-guard";
import {LoginComponent} from "./pages/login/login.component";
import {AccidentDetails} from "./pages/accident-details/accident-details.component";


const routes: Routes = [
  {
    path: '', canActivateChild: [AuthenticationGuard], children: [
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'home', component: HomeComponent},
      {path: 'accident/create', component: AccidentComponent},
      {path: 'accident/:id', component: AccidentDetails}
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
