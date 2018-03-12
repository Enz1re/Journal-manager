import { Injectable } from "@angular/core";

import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';

import { Http } from "@angular/http";

import { User } from "../models/User";


@Injectable()
export class AuthService {
    public currentUser: User;

    constructor (private http: Http) {
        
    }

    logIn(username: string, password: string) {

    }

    logOff() {
        
    }
}