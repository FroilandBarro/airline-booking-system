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
        const { origin, destination, departdate } = query;
        const departDateQuery = departdate ? `&departDate=${departdate}` : '';
        return this.http.get(`${this.baseUrl}/flights?originCode=${origin}&destCode=${destination}${departDateQuery}`);
    }

    getReturnAvailableFlights(query) {
        const { originCode, destCode, departDate, returnDate } = query;
        const departDateQuery = departDate ? `&departDate=${departDate}` : '';
        const returnDateQuery = returnDate ? `&returnDate=${returnDate}` : '';
        // tslint:disable-next-line:max-line-length
        return this.http.get(`${this.baseUrl}/flights/returnflights-available?originCode=${destCode}&destCode=${originCode}${departDateQuery}${returnDateQuery}`);
    }

    getAllFlights() {
        return this.http.get(`${this.baseUrl}/flights/getallflight`);
    }
}
