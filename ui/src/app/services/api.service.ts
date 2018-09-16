import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApiService {
    constructor(
        private http: HttpClient,
    ) { }

    private baseUrl = 'localhost:7000/api';

    getAllFlights() {
        return this.http.get(`${this.baseUrl}/flights`);
    }

    getAvailableFlights(query) {
        const { orig, dest } = query;
        return this.http.get(`${this.baseUrl}/flights?orig=${orig}&dest=${dest}`);
    }
}
