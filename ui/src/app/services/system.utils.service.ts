import { Injectable } from '@angular/core';

@Injectable()
export class SystemUtils {
    
    storeLocal(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    }

    retrieveItem(key) {
        return JSON.parse(localStorage.getItem(key));
    }

    deleteKey(key) {
        localStorage.removeItem(key);
    }
}