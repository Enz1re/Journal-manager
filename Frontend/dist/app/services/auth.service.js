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
require("rxjs/add/operator/map");
var http_1 = require("@angular/common/http");
var core_2 = require("angular2-cookie/core");
var AuthService = /** @class */ (function () {
    function AuthService(http, cookie) {
        this.http = http;
        this.cookie = cookie;
        this.accessToken = "";
        this.currentUser = null;
    }
    AuthService.prototype.register = function (firstName, secondName, patronymic, username, password) {
        var _this = this;
        return this.http.post("http://localhost:62774/api/Auth/Register", {
            firstName: firstName,
            secondName: secondName,
            patronymic: patronymic,
            username: username,
            password: password
        }).map(function (response) {
            _this.handleLoggedInUser(response);
            return true;
        });
    };
    AuthService.prototype.logIn = function (username, password) {
        var _this = this;
        return this.http.post("http://localhost:62774/api/Auth/Login", { username: username, password: password })
            .map(function (response) {
            _this.handleLoggedInUser(response);
            return true;
        });
    };
    AuthService.prototype.logOff = function () {
        this.currentUser = null;
        this.accessToken = "";
        this.cookie.removeAll();
    };
    AuthService.prototype.handleLoggedInUser = function (response) {
        this.currentUser = response.user;
        this.accessToken = response.access_token;
        this.cookie.putObject("user", response.user);
        this.cookie.put("access_token", response.access_token);
    };
    AuthService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient, core_2.CookieService])
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map