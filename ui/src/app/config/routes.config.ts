import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { BookingComponent } from '../components/main-app/booking/booking.component';
import { MainAppComponent } from '../components/main-app/main-app.component';

import { AdminloginComponent } from '../components/login/adminlogin/adminlogin.component';
import { ClientdashboardComponent } from '../components/client/clientdashboard/clientdashboard.component';
import { ClientloginComponent } from '../components/login/clientlogin/clientlogin.component';
import { AdminComponent } from '../components/admin/admin.component';
import { AdminDashboardComponent } from '../components/admin/dashboard/dashboard.component';



const routes: Routes = [
    { path: '', redirectTo: 'app', pathMatch: 'full' },
    {
        path: 'app', component: MainAppComponent,
        children: [
            { path: '', redirectTo: 'booking', pathMatch: 'full' },
            { path: 'booking', component: BookingComponent},
        ]
    },

    { path: 'adminlogin', component: AdminloginComponent },
    { path: 'clientlogin', component: ClientloginComponent },
    { path: 'clientprofile', component: ClientdashboardComponent },
    { path: 'admin', component: AdminComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: AdminDashboardComponent },
        ],
    },

];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes)
    ],
})

export class AppRoutingModule { }
