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
var User_1 = require("../models/User");
var AuthService = /** @class */ (function () {
    function AuthService(http) {
        this.http = http;
        this.currentUser = null;
    }
    AuthService.prototype.logIn = function (username, password, role) {
        if (username.toLowerCase() === 'admin' && password.toLowerCase() === 'admin') {
            var user = new User_1.User(username, username, username);
            this.currentUser = user;
            user.id = 420;
            user.role = role;
            return user;
        }
        else {
            return null;
        }
    };
    AuthService.prototype.logOff = function () {
        this.currentUser = null;
    };
    AuthService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map