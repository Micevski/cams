import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LayoutComponent} from './components/layout/layout.component';
import {MatMenuModule} from "@angular/material/menu";
import {HomeComponent} from './pages/home/home.component';
import {HttpClientModule} from "@angular/common/http";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatListModule} from "@angular/material/list";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {AccidentComponent} from './pages/accident/accident.component';
import {AgmCoreModule} from "@agm/core"
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatExpansionModule} from "@angular/material/expansion";
import {AccidentCreateComponent} from './components/accident-create/accident-create.component';
import {ParticipantsAddComponent} from './components/participants-add/participants-add.component';
import {PassengersAddComponent} from './components/passengers-add/passengers-add.component';
import {MatTabsModule} from "@angular/material/tabs";
import {MatTooltipModule} from "@angular/material/tooltip";
import {PassengerCreateDialog} from "./dialogs/passenger-create-dialog/passenger-create-dialog";
import {MatSelectModule} from "@angular/material/select";
import {MatSortModule} from "@angular/material/sort";
import {LoginComponent} from './pages/login/login.component';
import {MatCardModule} from "@angular/material/card";
import {AdminComponent} from './pages/admin/admin.component';
import {CommonModule, DatePipe} from '@angular/common';
import {UserListComponent} from './components/user-list/user-list.component';
import {AddUserDialog} from './dialogs/add-user-dialog/add-user-dialog';
import {ToastrModule} from 'ngx-toastr';
import {PersonCreateComponent} from './components/person-create/person-create.component';
import { ParticipantCreateComponent } from './components/participant-create/participant-create.component';
import { DocumentsComponent } from './components/documents/documents.component';
import {GalleryDialog} from "./dialogs/gallery-dialog/gallery-dialog";
import {MatCheckboxModule} from "@angular/material/checkbox";
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { NgxMatMomentModule } from '@angular-material-components/moment-adapter';
import { AnalyticPage } from './pages/analytic/analytic.page';
import { GoogleChartsModule } from 'angular-google-charts';
import { ParticipantsListComponent } from './components/participants-list/participants-list.component';
import { ParticipantsComponent } from './pages/participants/participants.component';
import { TableFilterComponent } from './components/table-filter/table-filter.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HomeComponent,
    AccidentComponent,
    AccidentCreateComponent,
    ParticipantsAddComponent,
    PassengersAddComponent,
    PassengerCreateDialog,
    LoginComponent,
    AdminComponent,
    UserListComponent,
    AddUserDialog,
    PersonCreateComponent,
    ParticipantCreateComponent,
    DocumentsComponent,
    GalleryDialog,
    AnalyticPage,
    ParticipantsListComponent,
    ParticipantsComponent,
    TableFilterComponent
  ],
  entryComponents: [
    PassengerCreateDialog,
    AddUserDialog,
    GalleryDialog
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatMenuModule,
        HttpClientModule,
        BrowserModule,
        BrowserAnimationsModule,
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
        MatTooltipModule,
        MatSelectModule,
        MatSortModule,
        MatCardModule,
        FormsModule,
        CommonModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        MatCheckboxModule,
        BrowserModule,
        NgxMatTimepickerModule,
        NgxMatDatetimePickerModule,
        NgxMatMomentModule,
        GoogleChartsModule
    ],
  providers: [
    MatDatepickerModule,
    DatePipe,
    NgxMatTimepickerModule,
    NgxMatDatetimePickerModule,
    NgxMatMomentModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
