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
var router_1 = require("@angular/router");
var http_service_1 = require("../../services/http.service");
var Term_1 = require("../../models/Term");
var requests_dialog_1 = require("../popups/requests/requests.dialog");
var AdminComponent = /** @class */ (function () {
    function AdminComponent(dialog, http, route) {
        this.dialog = dialog;
        this.http = http;
        this.route = route;
        this._pendingRequests = [];
        this._faculties = [];
        this._terms = [];
        this._currentTerm = new Term_1.Term();
        this._selectedFaculty = "";
        this._newFaculty = "";
        this._newDiscipline = "";
        this._tutors = [];
    }
    AdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.http.getPendingRequests().subscribe(function (requests) {
            _this._pendingRequests = requests;
        });
        this.route.queryParams.subscribe(function (params) {
            if (params.y) {
                _this._year = params.y;
                _this.http.getFaculties(params.y).subscribe(function (faculties) {
                    _this._faculties = faculties;
                });
            }
            else {
                _this.http.getYearData().subscribe(function (yearData) {
                    _this._year = yearData.currentYear.label;
                    _this.http.getFaculties(yearData.currentYear.label).subscribe(function (faculties) {
                        _this._faculties = faculties;
                    });
                });
            }
        });
        this.http.getTutors().subscribe(function (tutors) {
            _this._tutors = tutors;
        });
    };
    AdminComponent.prototype.addFaculty = function () {
        var _this = this;
        this.http.createFaculty(this._year, this._newFaculty).subscribe(function (faculty) {
            _this._faculties.push(faculty);
        });
    };
    AdminComponent.prototype.addDiscipline = function () {
        this.http.createDiscipline(this._selectedFaculty, this._newDiscipline, this._terms).subscribe(function (discipline) {
        });
    };
    AdminComponent.prototype.addTerm = function () {
        this._terms.push(this._currentTerm);
        this._currentTerm = new Term_1.Term();
    };
    AdminComponent.prototype.notificationMessage = function () {
        var ending = this._pendingRequests.length > 1 ? 'а' : '';
        return this._pendingRequests.length + " \u0437\u0430\u043F\u0440\u043E\u0441" + ending + ".";
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
        __metadata("design:paramtypes", [material_1.MatDialog, http_service_1.HttpService, router_1.ActivatedRoute])
    ], AdminComponent);
    return AdminComponent;
}());
exports.AdminComponent = AdminComponent;
//# sourceMappingURL=admin.component.js.map