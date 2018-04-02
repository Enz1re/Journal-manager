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
var material_1 = require("@angular/material");
var auth_service_1 = require("../../../services/auth.service");
var LoginDialog = /** @class */ (function () {
    function LoginDialog(dialogRef, auth) {
        this.dialogRef = dialogRef;
        this.auth = auth;
        this._role = "admin";
        this._error = false;
    }
    LoginDialog.prototype.onOkClick = function () {
        if (this.auth.logIn(this._username, this._password, this._role) === null) {
            this._error = true;
        }
        else {
            this._error = false;
            this.dialogRef.close({ username: this._username, password: this._password });
        }
    };
    LoginDialog = __decorate([
        core_1.Component({
            selector: 'login',
            templateUrl: 'app/components/popups/login/login.template.html',
        }),
        __metadata("design:paramtypes", [material_1.MatDialogRef, auth_service_1.AuthService])
    ], LoginDialog);
    return LoginDialog;
}());
exports.LoginDialog = LoginDialog;
//# sourceMappingURL=login.dialog.js.map