import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../../../services/sharedData.service';

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
  ) {
    this.sharedData.flights.subscribe((flights: any) => {
      this.flights = flights;
    });
  }

  ngOnInit() {
  }

}
