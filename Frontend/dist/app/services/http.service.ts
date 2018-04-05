import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';

import { Injectable } from "@angular/core";

import { HttpClient, HttpResponse } from "@angular/common/http";

import { Faculty } from "../models/Faculty";
import { Discipline } from "../models/Discipline";
import { Request } from "../models/Request";
import { Term } from "../models/Term";
import { User } from "../models/User";
import { YearData } from "../models/YearData";


@Injectable()
export class HttpService {
    constructor (private http: HttpClient) {

    }

    /**
     * Data
     */
    getYearData(): Observable<YearData> {
        return this.http.get(`http://localhost:62774/api/Data/Year`)
            .map((response: YearData) => response);
    }

    getFaculties(year: string): Observable<any[]> {
        return this.http.get(`http://localhost:62774/api/Data/Faculties/${year}`)
            .map((response: any) => response.faculties);
    }

    getFaculty(id: number): Observable<Faculty> {
        return this.http.get(`http://localhost:62774/api/Data/Faculty/${id}`)
            .map((response: Faculty) => response);
    }

    getDisciplines(facultyId: number): Observable<any[]> {
        return this.http.get(`http://localhost:62774/api/Data/Disciplines/${facultyId}`)
            .map((response: any) => response.disciplines);
    }

    getDiscipline(id: number): Observable<Discipline> {
        return this.http.get(`http://localhost:62774/api/Data/Discipline/${id}`)
            .map((response: Discipline) => response);
    }

    /**
     * Admin
     */
    getPendingRequests(): Observable<Request[]> {
        return this.http.get("http://localhost:62774/api/Admin/Request/Pending").map((response: Request[]) => response);
    }

    getTutors(): Observable<User[]> {
        return this.http.get("http://localhost:62774/api/Admin/Tutors").map((response: User[]) => response);
    }

    acceptPendingRequest(request: Request): Observable<any> {
        console.log(request);
        return this.http.post("http://localhost:62774/api/Admin/Request/Accept", request).map((response: HttpResponse<any>) => response);
    }

    declinePendingRequest(request: Request): Observable<any> {
        return this.http.post("http://localhost:62774/api/Admin/Request/Decline", request).map((response: HttpResponse<any>) => response);
    }

    createYear(yearLabel: string): Observable<any> {
        return this.http.post(`http://localhost:62774/api/Admin/Create/Year/${yearLabel}`, {})
            .map((response: HttpResponse<any>) => response);
    }

    createDiscipline(facName: string, discName: string, terms: Term[]): Observable<any> {
        return this.http.post("http://localhost:62774/api/Admin/Create/Discipline", { facultyName: facName, disciplineName: discName, terms: terms })
            .map((response: HttpResponse<any>) => response);
    }

    createTerm(discId: number, term: Term): Observable<any> {
        return this.http.post(`http://localhost:62774/api/Admin/Create/Term/${discId}`, term).map((response: HttpResponse<any>) => response);
    }

    createFaculty(year: string, facName: string): Observable<any> {
        return this.http.post("http://localhost:62774/api/Admin/Create/Faculty", { year: year, facultyName: facName })
            .map((response: HttpResponse<any>) => response);
    }
}
