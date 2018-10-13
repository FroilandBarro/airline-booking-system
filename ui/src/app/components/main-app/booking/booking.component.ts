import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { isDate } from '@angular/common/src/i18n/format_date';
import { SystemUtils } from '../../../services/system.utils.service';
import { SharedDataService } from '../../../services/sharedData.service';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {
  hasLoggedIn: boolean = false;
  flightSelected: any;
  returnFlightSelected: any;
  returnAvailableFlights: any;
  hasFlightSelected: boolean = false;
  availableFlights: any = [];
  trip: null;
  registerData: any = [];
  origins: any = [ {value: null, label: 'Select origin:'}, ...this.getPorts() ];
  destinations: any = [ {value: null, label: 'Select destination:'}, ...this.getPorts() ];
  classes: any = [ {value: null, label: 'Select class'}, ...this.getClass() ];
  
  forRound: boolean;
  roundselect: boolean;
  confirmed: boolean;

  getReturn: any= {
    origin: "DVO",
    destination: "CEB",
  }

  
  formModel: any = {
    departdate: Date,
    returndate: Date,
    clientName: null,
    returnFlightSelected: null,
    flightSelected: null,
    fees: {
      adultsCost: null,
      childrenCost: null,
      totalCost: null,
    },
    noOfAdults: 1,
    noOfChildren: 0,
    flightClass: null,
  };
  
  // clientDetails: any = [
  //   this.flightSelected,
  //   this.formModel,
  // ]
  clientModel: any = {
    name: null,
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
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.shared.currentUserData.subscribe((userData: any) => {
      this.userData = userData;
      });
   }

   ngOnInit() {
     if(this.userData){
    var id = this.route.snapshot.params.id
    const userData = JSON.parse(localStorage.getItem('userData'))
    this.userData = userData.data;
  }
}

  selectTrip(value) {
    this.trip = value;
    switch(value){
      case 0 : 
        this.tripModel.type = "ONE WAY";
        this.roundselect = false;
        break;
      case 1:
        this.tripModel.type = "ROUND";
        this.roundselect = true;
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
    this.forRound = true;

    this.getReturn.origin = flight.dest;
    this.getReturn.destination = flight.orig;

    this.api.getAvailableFlights(this.getReturn)
    .subscribe((response: any) => {
      if (response && response.data) {
        this.returnAvailableFlights = response.data;
        console.log(this.returnAvailableFlights);

      }
    }, (err) => {
      console.log(err);
    });

    this.flightSelected = flight;
    this.formModel.flightSelected = flight;
    this.formModel.flightSelected.departdate = this.formModel.departdate;
    this.hasFlightSelected = true;

    if(this.tripModel.type === "ROUND"){
      this.forRound = true;
    }
 
  }
  selectreturnflight(flight){
    this.returnFlightSelected = flight;
    this.formModel.returnFlightSelected = this.returnFlightSelected;
    
    console.log("FormModel Return: ",this.formModel.returnFlightSelected);
  }

  //for the discounted price
  countChange() {
   if(this.tripModel.type === "ONE WAY")
    {
    this.formModel.fees.adultsCost = this.formModel.noOfAdults * this.formModel.price;
    const rawCostChild = (this.formModel.noOfChildren * this.formModel.price);
    this.formModel.fees.childrenCost = rawCostChild - (rawCostChild * .25);
    this.formModel.fees.totalCost = this.formModel.fees.adultsCost + this.formModel.fees.childrenCost;
    }
    if(this.tripModel.type === "ROUND")
    {
    this.formModel.fees.adultsCost = this.formModel.noOfAdults * this.formModel.price * 2;
    const rawCostChild = (this.formModel.noOfChildren * this.formModel.price);
    this.formModel.fees.childrenCost = (rawCostChild - (rawCostChild * .25)) * 2;
    this.formModel.fees.totalCost = this.formModel.fees.adultsCost + this.formModel.fees.childrenCost;
    }
  }

  //for the price
  classChanged(flightClass) {
    switch(flightClass) {
      case 'ECO':
        this.formModel.price = this.formModel.flightSelected.ecoPrice;
        break;
      case 'BUS':
        this.formModel.price = this.formModel.flightSelected.busPrice;
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
    this.api.clientLogin(this.clientModel).subscribe((res: any) => {
      if(res){
      console.log(res);
      this.shared.setUserData(res);
      localStorage.setItem('userData', JSON.stringify(res)); 
    }
    });
  }
  clientlogin(){
    this.api.clientLogin(this.clientModel).subscribe((res: any) => {
      if(res){
      console.log(res);
      this.shared.setUserData(res);
      localStorage.setItem('userData', JSON.stringify(res));
      
    }
    });
  }
  click(){
    console.log(this.tripModel.type);
  }
  onSubmitDetails(form){
    this.formModel.clientName = this.userData.name;
    
    form = this.formModel
    console.log(form);
    this.api.saveclientDetails(form).subscribe(res=> {
      console.log(res);
      this.confirmed = true;
  });;
  }
}
