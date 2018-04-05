"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var http_1 = require("@angular/common/http");
var cookies_service_1 = require("angular2-cookie/services/cookies.service");
var components_module_1 = require("./components/components.module");
var root_component_1 = require("./components/root/root.component");
var http_interceptor_1 = require("./util/http.interceptor");
var http_service_1 = require("./services/http.service");
var auth_service_1 = require("./services/auth.service");
var authguard_user_service_1 = require("./services/authguard.user.service");
var authguard_admin_service_1 = require("./services/authguard.admin.service");
var JmModule = /** @class */ (function () {
    function JmModule(cookie, auth) {
        this.cookie = cookie;
        this.auth = auth;
        var user = cookie.getObject("user");
        var accessToken = cookie.get("access_token");
        auth.currentUser = user;
        auth.accessToken = accessToken;
    }
    JmModule = __decorate([
        core_1.NgModule({
            imports: [
                http_1.HttpClientModule,
                platform_browser_1.BrowserModule,
                components_module_1.ComponentsModule
            ],
            providers: [
                cookies_service_1.CookieService,
                http_service_1.HttpService,
                auth_service_1.AuthService,
                authguard_user_service_1.AuthGuardUser,
                authguard_admin_service_1.AuthGuardAdmin,
                {
                    provide: http_1.HTTP_INTERCEPTORS,
                    useClass: http_interceptor_1.Interceptor,
                    multi: true
                }
            ],
            bootstrap: [root_component_1.RootComponent]
        }),
        __metadata("design:paramtypes", [cookies_service_1.CookieService, auth_service_1.AuthService])
    ], JmModule);
    return JmModule;
}());
exports.JmModule = JmModule;
//# sourceMappingURL=main.module.js.map