import { Injectable, Injector } from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest
} from '@angular/common/http';

import { CookieService } from "angular2-cookie/core";

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/throw'
import 'rxjs/add/operator/catch';


@Injectable()
export class Interceptor implements HttpInterceptor {
    constructor(private cookieService: CookieService) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.cookieService.get("access_token") || "";
        const newReq = req.clone({ headers: req.headers.set("Authorization", `Bearer ${token}`)})
						  .clone({ headers: req.headers.set("X-Frame-Options", "Allow-From https://docs.google.com") })
		
        return next.handle(newReq).catch((error, caught) => {
            return Observable.throw(error);
        }) as any;
    }
}
