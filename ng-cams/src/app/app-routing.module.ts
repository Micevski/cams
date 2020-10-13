import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {AccidentComponent} from "./pages/accident/accident.component";
import {AuthenticationGuard} from "./guards/authentication-guard";
import {LoginComponent} from "./pages/login/login.component";
import { AdminComponent } from './pages/admin/admin.component';
import { AnalyticPage } from './pages/analytic/analytic.page';
import { ParticipantsComponent } from './pages/participants/participants.component';


const routes: Routes = [
  {
    path: '', canActivateChild: [AuthenticationGuard], children: [
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'admin', component: AdminComponent},
      {path: 'home', component: HomeComponent},
      {path: 'accident', component: AccidentComponent},
      {path: 'accident/:id', component: AccidentComponent},
      {path: 'analytic', component: AnalyticPage},
      {path: 'participants', component: ParticipantsComponent}
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
