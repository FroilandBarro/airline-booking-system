import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './config/routes.config';

import { ApiService } from './services/api.service';
import { SystemUtils } from './services/system.utils.service';
import { SharedDataService } from './services/sharedData.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/client/login/login.component';
import { MainAppComponent } from './components/main-app/main-app.component';
import { DashboardComponent } from './components/main-app/dashboard/dashboard.component';
import { BookingComponent } from './components/main-app/booking/booking.component';
import { AdminComponent } from './components/admin/admin.component';
import { MainNavComponent } from './components/shared/main-nav/main-nav.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainAppComponent,
    DashboardComponent,
    BookingComponent,
    AdminComponent,
    MainNavComponent,
   
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
  ],
  providers: [
    ApiService,
    SystemUtils,
    SharedDataService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }