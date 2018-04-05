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
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var material_1 = require("@angular/material");
var http_service_1 = require("../../services/http.service");
var auth_service_1 = require("../../services/auth.service");
var login_dialog_1 = require("../popups/login/login.dialog");
var RootComponent = /** @class */ (function () {
    function RootComponent(router, location, route, dialog, auth, http) {
        this.router = router;
        this.location = location;
        this.route = route;
        this.dialog = dialog;
        this.auth = auth;
        this.http = http;
        this._years = [];
        this._faculties = [];
        this._disciplines = [];
        this._currentFacultyId = -1;
        this._currentDisciplineId = -1;
        this._selectedYear = "";
        this._currentYear = "";
        var params = location.path().split('?')[0].split('/');
        var facId = +params[2];
        var discId = +params[3];
        this._currentFacultyId = facId;
        this._currentDisciplineId = discId;
    }
    RootComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.queryParams.subscribe(function (params) {
            _this.http.getYearData().subscribe(function (yearData) {
                _this._selectedYear = _this._currentYear = yearData.currentYear.label;
                _this._years = yearData.years;
                if (params.y) {
                    _this._selectedYear = params.y;
                    if (_this._selectedYear === _this._currentYear) {
                        _this.router.navigate(['']);
                    }
                }
                _this.http.getFaculties(_this._selectedYear).subscribe(function (faculties) {
                    _this._faculties = faculties;
                });
            });
        });
    };
    RootComponent.prototype.login = function (e) {
        var _this = this;
        e.preventDefault();
        var dialogRef = this.dialog.open(login_dialog_1.LoginDialog, {
            width: '400px',
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this._currentFacultyId = -1;
                _this._currentDisciplineId = -1;
                _this.router.navigateByUrl('');
            }
        });
    };
    RootComponent.prototype.logOff = function (e) {
        e.preventDefault();
        this.auth.logOff();
        this.router.navigate([''], { queryParamsHandling: "merge" });
    };
    RootComponent.prototype.changeYear = function (event) {
        this._selectedYear = event.value;
        if (this._selectedYear === this._currentYear) {
            this.router.navigate(['']);
        }
        else {
            this.router.navigate([''], { queryParams: { y: this._selectedYear } });
        }
    };
    RootComponent.prototype.goToMain = function (e) {
        e.preventDefault();
        this._currentDisciplineId = -1;
        this._currentFacultyId = -1;
        this.router.navigate([''], { queryParamsHandling: "merge" });
    };
    RootComponent.prototype.onFacultyOpened = function (faculty) {
        var _this = this;
        this._disciplines = [];
        this.http.getDisciplines(faculty.id).subscribe(function (disciplines) {
            _this._disciplines = disciplines;
        });
    };
    RootComponent.prototype.goToJournal = function (facId, discId) {
        this._currentDisciplineId = discId;
        this.router.navigate(["/journal/" + facId + "/" + discId], { queryParamsHandling: "merge" });
    };
    RootComponent.prototype.goToUserPage = function (e) {
        e.preventDefault();
        if (this.auth.currentUser.role === 2) {
            this.router.navigate(['/admin'], { queryParamsHandling: "merge" });
        }
        else {
            this.router.navigate(['/user'], { queryParamsHandling: "merge" });
        }
    };
    RootComponent = __decorate([
        core_1.Component({
            selector: "jm-root",
            templateUrl: "app/components/root/root.template.html",
            styleUrls: ["app/components/root/root.css"],
        }),
        __metadata("design:paramtypes", [router_1.Router, common_1.Location, router_1.ActivatedRoute,
            material_1.MatDialog, auth_service_1.AuthService, http_service_1.HttpService])
    ], RootComponent);
    return RootComponent;
}());
exports.RootComponent = RootComponent;
//# sourceMappingURL=root.component.js.map