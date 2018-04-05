import { Injectable } from "@angular/core";

import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';

import { HttpClient, HttpResponse } from "@angular/common/http";
import { CookieService } from 'angular2-cookie/core';

import { User } from "../models/User";


@Injectable()
export class AuthService {
    public accessToken = "";
    public currentUser: User = null;

    constructor (private http: HttpClient, private cookie: CookieService) {

    }

    register(firstName: string, secondName: string, patronymic: string, username: string, password: string): Observable<any> {
        return this.http.post("http://localhost:62774/api/Auth/Register", {
            firstName: firstName,
            secondName: secondName,
            patronymic: patronymic,
            username: username,
            password: password
        }).map((response: any) => {
            this.handleLoggedInUser(response);
            return true;
        });
    }

    logIn(username: string, password: string): Observable<any> {
        return this.http.post("http://localhost:62774/api/Auth/Login", { username, password })
            .map((response: any) => {
                this.handleLoggedInUser(response);
                return true;
            });
    }

    logOff() {
        this.currentUser = null;
        this.accessToken = "";
        this.cookie.removeAll();
    }

    private handleLoggedInUser(response) {
        this.currentUser = response.user;
        this.accessToken = response.access_token;
        this.cookie.putObject("user", response.user);
        this.cookie.put("access_token", response.access_token);
    }
}
