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

    private allflights = new BehaviorSubject<object>({});
    allAvailableFlights = this.userData.asObservable();

    private _flights = new BehaviorSubject<object>({});
    flights = this._flights.asObservable();

    private _selectedAirliner = new BehaviorSubject<object>({});
    airliner = this._selectedAirliner.asObservable();

    private _selectedFlight = new BehaviorSubject<object>({});
    selectedFlight = this._selectedFlight.asObservable();

    setUserData(userData: object) {
        return this.userData.next(userData);
    }

    setAllFlights(allflights: object) {
        return this.allflights.next(allflights);
    }

    setFlights(flights: object) {
        return this._flights.next(flights);
    }

    setActiveAirliner(airliner: object) {
        return this._selectedAirliner.next(airliner);
    }

    setSelectedFlight(flight: object) {
        return this._selectedFlight.next(flight);
    }
    setall
}
