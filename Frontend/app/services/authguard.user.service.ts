import { Injectable } from "@angular/core";
import {
    Router,
    CanActivate,
    RouterStateSnapshot,
    ActivatedRouteSnapshot
} from "@angular/router";

import { AuthService } from "../services/auth.service";
import { HttpService } from "../services/http.service";


@Injectable()
export class AuthGuardUser implements CanActivate {
    constructor(private auth: AuthService, private httpService: HttpService) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return !!this.auth.currentUser;
    }
}