import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AdminApiService {
    constructor(
        private http: HttpClient,
    ) { }

    messages = [];
    private baseUrl = 'http://localhost:8080/api/admin';

    getFlights(query) {
      const { airliner } = query;
      return this.http.get(`${this.baseUrl}/flights?airliner=${airliner}`);
    }

    setFlights(data) {
        return this.http.post(`${this.baseUrl}/save-flights`, data);
    }
}
