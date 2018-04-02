import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { CookieService } from 'angular2-cookie/services/cookies.service';

import { ComponentsModule } from "./components/components.module";

import { RootComponent } from "./components/root/root.component";

import { Interceptor } from "./util/http.interceptor";

import { HttpService } from "./services/http.service";
import { AuthService } from "./services/auth.service";
import { AuthGuardUser } from "./services/authguard.user.service";
import { AuthGuardAdmin } from "./services/authguard.admin.service";


@NgModule({
    imports: [
        HttpClientModule,
        BrowserModule,
        ComponentsModule
    ],
    providers: [
        CookieService,
        HttpService,
        AuthService,
        AuthGuardUser,
        AuthGuardAdmin,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: Interceptor,
            multi: true
        }
    ],
    bootstrap: [RootComponent]
})
export class JmModule {

}
