import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { BookingComponent } from '../components/main-app/booking/booking.component';
import { MainAppComponent } from '../components/main-app/main-app.component';
import { LoginComponent } from '../components/client/login/login.component';
import { AdminComponent } from '../components/admin/admin.component';


const routes: Routes = [
    { path: '', redirectTo: 'app', pathMatch: 'full' },
    {
        path: 'app', component: MainAppComponent,
        children: [
            { path: '', redirectTo: 'booking', pathMatch: 'full' },
            { path: 'booking', component: BookingComponent},
        ]
    },


    { path: 'clientregister', component: LoginComponent },
    { path: 'adminlogin', component: AdminComponent }

];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes)
    ],
})

export class AppRoutingModule { }
