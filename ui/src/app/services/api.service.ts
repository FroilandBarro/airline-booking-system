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
        return this.http.post(`${this.baseUrl}/flights/clientregister`, registerData).subscribe(res => {
            console.log(res);
        });
    }

    clientLogin(loginData) {
        return this.http.post(`${this.baseUrl}/flights/clientlogin`, loginData)
    }

    getLoggedUser(id) {
        return this.http.post(`${this.baseUrl}/flights/clientprofile?id=${id}`, id)
    }

    adminLogin(adminData) {
        return this.http.post(`${this.baseUrl}/flights/adminlogin`, adminData)
    }

    getAllFlights() {
        return this.http.get(`${this.baseUrl}/flights`);
    }

    saveclientDetails() {
        return this.http.get(`${this.baseUrl}/book`);
    }

    
    getAvailableFlights(query) {
        const { origin, destination } = query;
        return this.http.get(`${this.baseUrl}/flights?orig=${origin}&dest=${destination}`);
    }
}
