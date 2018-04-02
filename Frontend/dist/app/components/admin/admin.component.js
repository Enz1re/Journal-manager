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
var http_service_1 = require("../../services/http.service");
var requests_dialog_1 = require("../popups/requests/requests.dialog");
var AdminComponent = /** @class */ (function () {
    function AdminComponent(dialog, http) {
        this.dialog = dialog;
        this.http = http;
        this._pendingRequests = [];
    }
    AdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.http.getPendingRequests().subscribe(function (requests) {
            _this._pendingRequests = requests;
        });
    };
    AdminComponent.prototype.notificationMessage = function () {
        var verb = this._pendingRequests.length > 1 ? 'are' : 'is';
        var ending = this._pendingRequests.length > 1 ? 's' : '';
        return "There " + verb + " " + this._pendingRequests.length + " pending request" + ending + ".";
    };
    AdminComponent.prototype.showRequestList = function (e) {
        e.preventDefault();
        var dialogRef = this.dialog.open(requests_dialog_1.RequestsDialog, {
            width: '700px',
            height: '500px',
            data: { requests: this._pendingRequests }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
        });
    };
    AdminComponent = __decorate([
        core_1.Component({
            selector: 'admin',
            templateUrl: "app/components/admin/admin.template.html",
            styleUrls: ["app/components/admin/admin.css"]
        }),
        __metadata("design:paramtypes", [material_1.MatDialog, http_service_1.HttpService])
    ], AdminComponent);
    return AdminComponent;
}());
exports.AdminComponent = AdminComponent;
//# sourceMappingURL=admin.component.js.map