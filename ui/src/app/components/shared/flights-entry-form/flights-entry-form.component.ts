import { Component, OnInit } from '@angular/core';
import { FlightsEntryFormService } from './flights-entry-form.service';
import { AdminApiService } from 'src/app/services/admin.api.service';
import { SharedDataService } from 'src/app/services/sharedData.service';

import * as moment from 'moment';

@Component({
  selector: 'app-flights-entry-form',
  templateUrl: './flights-entry-form.component.html',
  styleUrls: ['./flights-entry-form.component.scss']
})
export class FlightsEntryFormComponent implements OnInit {
  formModuleData: any = {
    origin: [{ code: null, name: 'Select origin' }, ...this.getPlaces() ],
    destination: [{ code: null, name: 'Select destination' }, ...this.getPlaces() ],
  };

  showForm = false;
  formData: any = this.getInitData();

  airliner: any;

  constructor(
    private api: AdminApiService,
    private flightForm: FlightsEntryFormService,
    private sharedData: SharedDataService,
  ) {}

  ngOnInit() {
    this.flightForm.flightsFormData.subscribe((formData: any) => {

      if (formData && formData.pop) {
        this.showForm = formData.pop;
      }

      if (formData._id) {
        this.formData = formData;
        this.formData.flightDate = this.formatDate(formData.flightDate);
      } else {
        this.formData = this.getInitData();
      }
    });

    this.sharedData.airliner.subscribe((airliner: any) => {
      this.airliner = airliner;
    });
  }

  getToday() {
    const today = new Date();
    return moment(today).format('YYYY-MM-DD');
  }


  formatDate(date) {
    const newDate = new Date(date);
    return moment(newDate).format('YYYY-MM-DD');
  }

  save() {
    const { formData, airliner } = this;
    formData.airliner = airliner.code;

    this.api.setFlights(formData)
      .subscribe((response: any) => {
        this.sharedData.setFlights(response.data);
      });

    this.close();
  }

  close() {
    this.showForm = false;
    const formData = {
      pop: this.showForm,
    };

    this.flightForm.updateFormData(formData);
  }

  getInitData() {
    return {
      flightDate: this.getToday(),
      originCode: null,
      destCode: null,
    };
  }

  getPlaces() {
    return [
      { code: 'DVO', name: 'DAVAO' },
      { code: 'MNL', name: 'MANILA' },
      { code: 'CEB', name: 'CEBU' },
      { code: 'CLK', name: 'CLARK' },
      { code: 'BHL', name: 'BOHOL' },
      { code: 'PWN', name: 'PALAWAN' },
    ];
  }
}
