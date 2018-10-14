import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../../../services/sharedData.service';
import { FlightsEntryFormService } from '../flights-entry-form/flights-entry-form.service';

@Component({
  selector: 'app-flights-list',
  templateUrl: './flights-list.component.html',
  styleUrls: ['./flights-list.component.scss']
})
export class FlightsListComponent implements OnInit {

  hasSelected: boolean;
  flights: any;
  constructor(
    private sharedData: SharedDataService,
    private entryForm: FlightsEntryFormService,
  ) {
    this.sharedData.flights.subscribe((flights: any) => {
      this.flights = this.dataMapper(flights);
    });
  }

  ngOnInit() {
  }

  openModalEntry() {
    const formData = {
      pop: true,
    };

    this.entryForm.updateFormData(formData);
  }

  dataMapper(data) {
    if (data && data.length) {
      data.map((o) => {
        // TODO: get booked
        o.booked = 0;
      });
    } else {
      return [];
    }

    return data;
  }
}
