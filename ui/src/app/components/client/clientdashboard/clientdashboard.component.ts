import { Component, OnInit } from '@angular/core';
import { SystemUtils } from '../../../services/system.utils.service';
import { SharedDataService } from '../../../services/sharedData.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../services/api.service';

import * as moment from 'moment';

@Component({
  selector: 'app-clientdashboard',
  templateUrl: './clientdashboard.component.html',
  styleUrls: ['./clientdashboard.component.scss']
})
export class ClientdashboardComponent implements OnInit {
  userData: any;
  oneWay: any = [];
  roundTrip: any = [];
  returnbookSelected: any;
  onewaySelected: any;
  withReturn: any = [];
  bookFlights: any = [];
  constructor(
    private utils: SystemUtils,
    private shared: SharedDataService,
    private router: Router,
    private route: ActivatedRoute,
    private api: ApiService,
  ) {
    this.shared.currentUserData.subscribe((userData: any) => {
      this.userData = userData;
    });
  }
  ngOnInit() {
    var id = this.route.snapshot.params.id
    const userData = JSON.parse(localStorage.getItem('userData'))
    this.userData = userData.data;
    this.api.specificBooks(this.userData).subscribe((res: any) => {
      if (res && res.data) {
        this.flightMapping(res.data);
      }
    });
  }
  flightMapping(data) {
    data.map(o => {
      if (o.returnFlightSelected && !o.isCanceled) {
        this.roundTrip.push(o);
      }
      if (o.flightSelected && !o.isCanceled) {
        this.oneWay.push(o);
        console.log(this.oneWay);
      }
    })
  }
  returnClick(form) {
    this.returnbookSelected = form;
    console.log(this.returnbookSelected);
  }
  onewayClick(form) {
    this.onewaySelected = form;
  }
  oncancelReturn() {
    if (this.returnbookSelected) {
      this.api.cancelFlight(this.returnbookSelected).subscribe((res: any) => {
        if (res & res.data) {
          console.log(res.data)
        }
      })
    }
  }
  oncancel() {
    if (this.onewaySelected) {
      this.api.cancelFlight(this.onewaySelected).subscribe((res: any) => {
        if (res & res.data) {
          console.log(res.data)
        }
      })
    }
  }
}
