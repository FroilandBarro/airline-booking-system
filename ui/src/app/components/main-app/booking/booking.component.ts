import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { isDate } from '@angular/common/src/i18n/format_date';
import { SystemUtils } from '../../../services/system.utils.service';
import { SharedDataService } from '../../../services/sharedData.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {
  hasLoggedIn: boolean = false;
  flightSelected: any;
  hasFlightSelected: boolean = false;
  availableFlights: any = [];
  trip: null;
  registerData: any = [];
  origins: any = [ {value: null, label: 'Select origin:'}, ...this.getPorts() ];
  destinations: any = [ {value: null, label: 'Select destination:'}, ...this.getPorts() ];
  classes: any = [ {value: null, label: 'Select class'}, ...this.getClass() ];
  formModel: any = {
    origin: null,
    destination: null,
    classes: null,
    departdate: null,
    returndate: null,
  };
  flightModel: any = {
    noOfAdults: 1,
    noOfChildren: 0,
    flightClass: null,

  };
  clientModel: any = {
    email: null,
    password: null,
    birthdate: null,
  };
  tripModel: any = {
    type: null,
  }
  userData: any;
  constructor(
    private api: ApiService,
    private utils: SystemUtils,
    private shared: SharedDataService,
  ) {
    this.shared.currentUserData.subscribe((userData: any) => {
      this.userData = userData;
      });
   }

  ngOnInit() {
  }
  
  tripDate(){
   
  }

  selectTrip(value) {
    this.trip = value;
    switch(value){
      case 0 : 
        this.tripModel.type = "ONE WAY";
        break;
      case 1:
        this.tripModel.type = "ROUND";
        break;
    }
  }
  

  originChange(value, type) {
    switch (type) {
      case 0:
        const destinations = this.getPorts();
        this.destinations = destinations.filter(o => o.value !== value);
        break;
      case 1:
        const origins = this.getPorts();
        this.origins = origins.filter(o => o.value !== value);
        break;
    }
  }

  getPorts() {
    return [
      { value: 'DVO', label: 'DVO - Davao' },
      { value: 'CEB', label: 'CEB - Cebu' },
      { value: 'CLK', label: 'CLK - Clark' },
      { value: 'MNL', label: 'MNL - Manila' },
    ];
  }
  getClass() {
    return [
      { value: 'ECO', label: 'ECO - Economy' },
      { value: 'BUS', label: 'BUS - Business' },
      ];
    }

  selectflight(flight){
    this.flightSelected = flight;
    this.flightSelected.departdate = this.formModel.departdate;
    this.hasFlightSelected = true;
    console.log(this.formModel, this.flightSelected);
  }

  countChange() {
    this.flightModel.adultsCost = this.flightModel.noOfAdults * this.flightModel.price;
    const rawCostChild = (this.flightModel.noOfChildren * this.flightModel.price);
    this.flightModel.childrenCost = rawCostChild - (rawCostChild * .25);
    this.flightModel.totalCost = this.flightModel.adultsCost + this.flightModel.childrenCost;
  }

  classChanged(flightClass) {
    switch(flightClass) {
      case 'ECO':
        this.flightModel.price = this.flightSelected.ecoPrice;
        break;
      case 'BUS':
        this.flightModel.price = this.flightSelected.busPrice;
        break;
    }
    this.countChange();
  }

  onSubmit(form) {
    console.log(form);
    this.api.getAvailableFlights(form)
      .subscribe((response: any) => {
        if (response && response.data) {
          this.availableFlights = response.data;
        }
      }, (err) => {
        console.log(err);
      });
  }
  clientregister(){
    console.log(this.clientModel);
    this.api.registerClient(this.clientModel);
  }
  clientlogin(){
    this.api.clientLogin(this.clientModel);  
  }
  onSubmitDetails(form){

  }
}
