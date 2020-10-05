import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './components/nav/nav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatChipsModule } from '@angular/material/chips';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TodoEntryComponent } from './components/todo-entry/todo-entry.component';
import { ActionsComponent } from './components/actions/actions.component';
import { ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers } from './reducers';
import { ForecastComponent } from './components/forecast/forecast.component';
import { InboxComponent } from './components/inbox/inbox.component';
import { ProjectsComponent } from './components/projects/projects.component';

const materialModules = [
  MatSidenavModule,
  MatToolbarModule,
  MatListModule,
  MatIconModule,
  MatCardModule,
  MatButtonModule,
  MatBottomSheetModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  StoreModule.forRoot(reducers),
  StoreDevtoolsModule.instrument(),
  MatChipsModule
];

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    DashboardComponent,
    TodoEntryComponent,
    ActionsComponent,
    ForecastComponent,
    InboxComponent,
    ProjectsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ...materialModules,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
