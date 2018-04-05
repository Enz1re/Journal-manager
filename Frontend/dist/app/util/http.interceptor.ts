import { Injectable, Injector } from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest
} from '@angular/common/http';

import { AuthService } from "../services/auth.service";

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/throw'
import 'rxjs/add/operator/catch';


@Injectable()
export class Interceptor implements HttpInterceptor {
    constructor(private auth: AuthService) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.auth.accessToken;
        const newReq = req.clone({ setHeaders: { 'Authorization': `Bearer ${token}`, 'X-Frame-Options': 'Allow-From https://docs.google.com' } });

        return next.handle(newReq).catch((error, caught) => {
            return Observable.throw(error);
        }) as any;
    }
}
