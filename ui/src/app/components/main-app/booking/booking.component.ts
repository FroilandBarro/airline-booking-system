import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {

  availableFlights: any = [];
  trip: any = 0;
  origins: any = [ {value: null, label: 'Select origin:'}, ...this.getPorts() ];
  destinations: any = [ {value: null, label: 'Select destination:'}, ...this.getPorts() ];
  formModel: any = {
    origin: null,
    destination: null,
  };

  constructor(
    private api: ApiService,
  ) { }

  ngOnInit() {
  }

  selectTrip(value) {
    this.trip = value;
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

}
