import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';

import { Injectable } from "@angular/core";

import { HttpClient } from "@angular/common/http";

import { Faculty } from "../models/Faculty";
import { Request } from "../models/Request";
import { Term } from "../models/Term";


@Injectable()
export class HttpService {
    constructor (private http: HttpClient) {

    }

    getYears(): Observable<string[]> {
        return this.http.get("../../data/years.json").map((response: any) => <string[]>response.years);
    }

    getCurrentYear(): Observable<string> {
        return this.http.get("../../data/appconstants.json").map((response: any) => <string>response.appconstants.currentYear);
    }

    getFaculties(year: string): Observable<Faculty[]> {
        return this.http.get("../../data/faculties.json").map((response: any) => <Faculty[]>response[year].faculties);
    }

	getPendingRequests(): Observable<Request[]> {
		return this.http.get("../../data/requests.json").map((response: any) => <Request[]>response.requests);
	}
}
