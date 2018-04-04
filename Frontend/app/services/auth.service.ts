import { Injectable } from "@angular/core";

import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';

import { HttpClient, HttpResponse } from "@angular/common/http";

import { User } from "../models/User";


@Injectable()
export class AuthService {
    public currentUser: User = null;

    constructor (private http: HttpClient) {

    }

    register(firstName: string, secondName: string, patronymic: string, username: string, password: string): Observable<any> {
        return this.http.post("http://localhost:62774/api/Auth/Register", {
            firstName: firstName,
            secondName: secondName,
            patronymic: patronymic,
            username: username,
            password: password
        }).map((response: HttpResponse<any>) => response.body);
    }

    logIn(username: string, password: string): Observable<any> {
        return this.http.post("http://localhost:62774/api/Auth/Login", { username: username, password }).map((response: HttpResponse<any>) => response.body);
    }

    logOff() {
		this.currentUser = null;
    }
}
