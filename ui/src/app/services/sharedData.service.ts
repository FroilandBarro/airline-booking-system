import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { SystemUtils } from './system.utils.service';

@Injectable()
export class SharedDataService {
    constructor(
        private utils: SystemUtils,
    ) {
        this.setUserData(this.utils.retrieveItem('userData'));
    }

    private userData = new BehaviorSubject<object>({});
    currentUserData = this.userData.asObservable();

    private _flights = new BehaviorSubject<object>({});
    flights = this._flights.asObservable();

    setUserData(userData: object) {
        return this.userData.next(userData);
    }

    setFlights(flights: object) {
        return this._flights.next(flights);
    }
}
