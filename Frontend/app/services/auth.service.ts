import { Injectable } from "@angular/core";

import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';

import { HttpClient } from "@angular/common/http";

import { User } from "../models/User";


@Injectable()
export class AuthService {
    public currentUser: User = null;

    constructor (private http: HttpClient) {

    }

    logIn(username: string, password: string) {
        if (username.toLowerCase() === 'admin' && password.toLowerCase() === 'admin') {
            const user = new User(username, username, username);
            this.currentUser = user;
			user.id = 420;
			user.role = "admin";
            return user;
        } else {
            return null;
        }
    }

    logOff() {

    }
}
