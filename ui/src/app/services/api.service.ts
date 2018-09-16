import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApiService {
    constructor(
        private http: HttpClient,
    ) { }

    private baseUrl = 'http://localhost:8080/api';

    getAllFlights() {
        return this.http.get(`${this.baseUrl}/flights`);
    }

    getAvailableFlights(query) {
        const { origin, destination } = query;
        return this.http.get(`${this.baseUrl}/flights?orig=${origin}&dest=${destination}`);
    }
}
