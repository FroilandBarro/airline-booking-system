import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { SystemUtils } from './system.utils.service';

@Injectable()
export class SharedDataService {
    constructor(
        private utils: SystemUtils,
    ){
        this.setUserData(this.utils.retrieveItem('userData'));
    }

    private userData = new BehaviorSubject<object>({});
    currentUserData = this.userData.asObservable();

    setUserData(userData: object) {
        return this.userData.next(userData);
    }

}