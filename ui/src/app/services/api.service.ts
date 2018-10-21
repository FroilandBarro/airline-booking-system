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

    saveclientDetails(clientDetails) {
        return this.http.post(`${this.baseUrl}/flights/book`, clientDetails )
    }
    specificBooks(datas) {
        return this.http.post(`${this.baseUrl}/flights/specificbooks`, datas)
    }
    cancelFlight(datas) {
        return this.http.post(`${this.baseUrl}/flights/cancelflight`, datas)
    }

    getAvailableFlights(query) {
        const { origin, destination } = query;
        return this.http.get(`${this.baseUrl}/flights?orig=${origin}&dest=${destination}`);
    }
    getReturnAvailableFlights(query) {
        const { orig, dest } = query;
        return this.http.get(`${this.baseUrl}/flights/returnflights-available?origin=${orig}&destination=${dest}`);
    }
    getAllFlights() {
        return this.http.get(`${this.baseUrl}/flights/getallflight`);
    }
}
