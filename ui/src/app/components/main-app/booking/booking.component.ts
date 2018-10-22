import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { isDate } from '@angular/common/src/i18n/format_date';
import { SystemUtils } from '../../../services/system.utils.service';
import { SharedDataService } from '../../../services/sharedData.service';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';

import * as moment from 'moment';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {
  today: any;
  nextDay: Date;
  hasLoggedIn: boolean;
  flightSelected: any;
  returnFlightSelected: any;
  returnAvailableFlights: any = [];
  hasFlightSelected: boolean;
  availableFlights: any = [];
  bookedSeats = [];
  selectedDepart: any = null;
  selectedReturn: any = null;
  trip: null;
  registerData: any = [];
  origins: any = [ {value: null, label: 'Select origin:'}, ...this.getPorts() ];
  destinations: any = [ {value: null, label: 'Select destination:'}, ...this.getPorts() ];
  classes: any = [ {value: null, label: 'Select class'}, ...this.getClass() ];

  forRound: boolean;
  roundselect: boolean;
  confirmed: boolean;

  getReturn: any = {
    orig: null,
    dest: null,
  };

  formModel: any = {
    departdate: null,
    returndate: null,
    clientId: null,
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

  clientModel: any = {
    name: null,
    email: null,
    password: null,
    birthdate: null,
  };
  tripModel: any = {
    type: null,
  };

  userData: any;
  allFlights : any = [];
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

    this.today = moment().format('YYYY-MM-DD');
    this.formModel.departdate = this.today;
   }

  ngOnInit() {
     if (this.userData) {
      const id = this.route.snapshot.params.id;
      const userData = JSON.parse(localStorage.getItem('userData'));
      this.userData = userData.data;
    }

    this.api.getAllFlights().subscribe((res: any) => {
      this.allFlights = res.data;
      this.utils.storeLocal('allFlights', this.allFlights);
    });
  }

  returnSched(date) {
  }

  selectTrip(value) {
    this.trip = value;
    switch (value) {
      case 0:
        this.tripModel.type = 'ONE WAY';
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
      { value: 'DVO', label: 'DAVAO' },
      { value: 'MNL', label: 'MANILA' },
      { value: 'CEB', label: 'CEBU' },
      { value: 'CLK', label: 'CLARK' },
      { value: 'BHL', label: 'BOHOL' },
      { value: 'PWN', label: 'PALAWAN' },
    ];
  }

  getClass() {
    return [
      { value: 'ECO', label: 'ECO - Economy' },
      { value: 'BUS', label: 'BUS - Business' },
      ];
    }

  selectflight(flight, idx) {
    const { departdate, returndate } = this.formModel;
    this.selectedDepart = idx;
    this.getReturn.destination = flight.originCode;
    this.getReturn.destCode = flight.destCode;
    this.getReturn.origin = flight.destCode;
    this.getReturn.originCode = flight.originCode;
    this.getReturn.departDate = departdate;
    this.getReturn.returnDate = returndate;

    this.api.getReturnAvailableFlights(this.getReturn)
    .subscribe((response: any) => {
      this.returnAvailableFlights = response.data;
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
  selectreturnflight(flight, idx) {
    this.selectedReturn = idx;
    this.formModel.returnFlightSelected = flight;
    console.log("FormModel Return: ",this.formModel);
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
    this.api.getAvailableFlights(form)
      .subscribe((response: any) => {
        if (response && response.data) {
          this.availableFlights = response.data;
        }
      }, (err) => {
        console.log(err);
      });
  }

  getAvailableSeats(flight, classType) {
    const bookedSeats = this.utils.retrieveItem('bookedSeats');
    let seats = 0;
    if (bookedSeats && bookedSeats.length) {
      const foundSeat = bookedSeats.filter(o => {
        return o.flightId === flight._id;
      });

      if (foundSeat[0]) {
        const seatFound = foundSeat[0];
        seats = classType === 'ECO' ? (flight.ecoSeats - seatFound.ecoSeats) : (flight.busSeats - seatFound.busSeats);
      } else {
        seats = classType === 'ECO' ? flight.ecoSeats : flight.busSeats;
      }
    } else {
      seats = classType === 'ECO' ? flight.ecoSeats : flight.busSeats;
    }
    return seats;
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
      if (res) {
      console.log(res);
      this.shared.setUserData(res);
      localStorage.setItem('userData', JSON.stringify(res));
    }
    });
  }

  click() {
    return true;
  }

  onSubmitDetails(form) {
    const newDate = new Date(this.formModel.returndate);
    this.formModel.returndate = moment(this.formModel.returndate).format('DD-MM-YYYY');
    this.formModel.returndate = moment(this.formModel.departdate).format('DD-MM-YYYY');

    this.api.saveclientDetails(form).subscribe(res => {
      this.confirmed = true;
      this.updateFlightSeat(form, this.flightSelected);
      if (this.formModel.returnFlightSelected) {
        this.updateFlightSeat(form, this.formModel.returnFlightSelected);
      }
    });
  }

  updateFlightSeat(form, data) {
    let bookedSeats = this.utils.retrieveItem('bookedSeats');

    const noOfPassenger = form.noOfAdults + form.noOfChildren;
    let ecoSeats = 0;
    let busSeats = 0;

    if (bookedSeats && bookedSeats.length) {
      bookedSeats.map(o => {
        if (o.flightId === data._id) {
          o.ecoSeats = o.ecoSeats + (form.fligtClass === 'ECO' ? noOfPassenger : 0);
          o.busSeats = o.busSeats + (form.fligtClass === 'BUS' ? noOfPassenger : 0);
        } else {
          ecoSeats = form.fligtClass === 'ECO' ? noOfPassenger : 0;
          busSeats = form.fligtClass === 'BUS' ? noOfPassenger : 0;
          const booked = {
            flightId: data._id,
            ecoSeats: ecoSeats,
            busSeats: busSeats,
          };
          bookedSeats.push(booked);
        }
      });
    } else {
      ecoSeats = form.fligtClass === 'ECO' ? noOfPassenger : 0;
      busSeats = form.fligtClass === 'BUS' ? noOfPassenger : 0;
      const booked = {
        flightId: data._id,
        ecoSeats: ecoSeats,
        busSeats: busSeats,
      };
      bookedSeats = [];
      bookedSeats.push(booked);
    }
    this.utils.storeLocal('bookedSeats', bookedSeats);
  }
}
