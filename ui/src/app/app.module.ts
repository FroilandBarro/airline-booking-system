import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';

import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './config/routes.config';

import { ApiService } from './services/api.service';
import { SystemUtils } from './services/system.utils.service';
import { SharedDataService } from './services/sharedData.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/client/login/login.component';
import { MainAppComponent } from './components/main-app/main-app.component';
import { AdminDashboardComponent } from './components/admin/dashboard/dashboard.component';
import { DashboardComponent } from './components/main-app/dashboard/dashboard.component';
import { BookingComponent } from './components/main-app/booking/booking.component';
import { AdminComponent } from './components/admin/admin.component';
import { MainNavComponent } from './components/shared/main-nav/main-nav.component';
import { ClientdashboardComponent } from './components/client/clientdashboard/clientdashboard.component';
import { AdminloginComponent } from './components/login/adminlogin/adminlogin.component';
import { ClientloginComponent } from './components/login/clientlogin/clientlogin.component';
import { ListTableComponent } from './components/shared/widgets/list-table/list-table.component';
import { BookingsComponent } from './components/shared/bookings/bookings.component';
import { AirlinesListComponent } from './components/shared/airlines-list/airlines-list.component';
import { FlightsListComponent } from './components/shared/flights-list/flights-list.component';
import { ViewBookComponent } from './components/client/view-book/view-book.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainAppComponent,
    DashboardComponent,
    BookingComponent,
    AdminComponent,
    MainNavComponent,
    ClientdashboardComponent,
    AdminloginComponent,
    ClientloginComponent,
    AdminDashboardComponent,
    ListTableComponent,
    BookingsComponent,
    AirlinesListComponent,
    FlightsListComponent,
    ViewBookComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    ApiService,
    SystemUtils,
    SharedDataService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
