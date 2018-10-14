import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlightsEntryFormService {

  constructor() { }

  private flightsForm = new BehaviorSubject<object>({});
  flightsFormData = this.flightsForm.asObservable();

  updateFormData(data: object) {
    return this.flightsForm.next(data);
  }
}
