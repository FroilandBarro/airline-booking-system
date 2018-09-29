import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApiService {
    constructor(
        private http: HttpClient,
    ) { }

    messages = [];
    private baseUrl = 'http://localhost:8080/api';

    registerClient(registerData) {
        return this.http.post(`${this.baseUrl}/flights/clientregister`, registerData);
    }

    clientLogin(loginData) {
        return this.http.get(`${this.baseUrl}/flights/clientregister`, loginData);
    }

    getAllFlights() {
        return this.http.get(`${this.baseUrl}/flights`);
    }

    saveclientDetails() {
        return this.http.get(`${this.baseUrl}/book`);
    }

    adminLogin(adminData) {
        return this.http.get(`${this.baseUrl}/flights/adminlog`, adminData);
    }

    getAvailableFlights(query) {
        const { origin, destination } = query;
        return this.http.get(`${this.baseUrl}/flights?orig=${origin}&dest=${destination}`);
    }
}
