import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutComponent } from './components/layout/layout.component';
import {MatMenuModule} from "@angular/material/menu";
import { HomeComponent } from './pages/home/home.component';
import {HttpClientModule} from "@angular/common/http";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatListModule} from "@angular/material/list";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import { AccidentComponent } from './pages/accident/accident.component';
import { AgmCoreModule } from "@agm/core"
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDatepicker, MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatExpansionModule} from "@angular/material/expansion";
import { AccidentCreateComponent } from './pages/accident/accident-create/accident-create.component';
import { ParticipantsAddComponent } from './pages/accident/participants-add/participants-add.component';
import { PassengersAddComponent } from './pages/accident/passengers-add/passengers-add.component';
import {MatTabsModule} from "@angular/material/tabs";
import {MatTooltipModule} from "@angular/material/tooltip";

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HomeComponent,
    AccidentComponent,
    AccidentCreateComponent,
    ParticipantsAddComponent,
    PassengersAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatMenuModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAIzG6TEQPJb38Me-SY8stxKnkv8aLOnNo',
      libraries: ['places']
    }),
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatTabsModule,
    MatTooltipModule
  ],
  providers: [
    MatDatepickerModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
