import { Component, OnInit } from '@angular/core';
import { FlightsEntryFormService } from './flights-entry-form.service';

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
  formData: any = {
    originCode: null,
    destCode: null,
  };

  constructor(
    private flightForm: FlightsEntryFormService,
  ) {}

  ngOnInit() {
    this.flightForm.flightsFormData.subscribe((formData: any) => {
      if (formData && formData.pop) {
        this.showForm = formData.pop;
      }
    });
  }

  save() {
    console.log(this.formData);
  }
  close() {
    this.showForm = false;
    const formData = {
      pop: this.showForm,
    };

    this.flightForm.updateFormData(formData);
  }

  getPlaces() {
    return [
      { code: 'DVO', name: 'DAVAO' },
      { code: 'MNL', name: 'MANILA' },
      { code: 'CEB', name: 'CEBU' },
      { code: 'BHL', name: 'BOHOL' },
      { code: 'PWN', name: 'PALAWAN' },
    ];
  }
}
