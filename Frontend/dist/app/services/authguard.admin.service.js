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
var auth_service_1 = require("../services/auth.service");
var http_service_1 = require("../services/http.service");
var AuthGuardAdmin = /** @class */ (function () {
    function AuthGuardAdmin(auth, httpService) {
        this.auth = auth;
        this.httpService = httpService;
    }
    AuthGuardAdmin.prototype.canActivate = function (route, state) {
        return !!this.auth.currentUser && this.auth.currentUser.role === 'admin';
    };
    AuthGuardAdmin = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [auth_service_1.AuthService, http_service_1.HttpService])
    ], AuthGuardAdmin);
    return AuthGuardAdmin;
}());
exports.AuthGuardAdmin = AuthGuardAdmin;
//# sourceMappingURL=authguard.admin.service.js.map