import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';

import { Injectable } from "@angular/core";

import { Http } from "@angular/http";

import { Faculty } from "../models/Faculty";


@Injectable()
export class HttpService {
    constructor (private http: Http) {
        
    }

    getYears(): Observable<string[]> {
        return this.http.get("../../data/years.json").map(response => <string[]>response.json().years);
    }

    getCurrentYear(): Observable<string> {
        return this.http.get("../../data/appconstants.json").map(response => <string>response.json().appconstants.currentYear);
    }

    getFaculties(year: string): Observable<Faculty[]> {
        return this.http.get("../../data/faculties.json").map(response => <Faculty[]>response.json()[year].faculties);
    }
}