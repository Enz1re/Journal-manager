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
var router_1 = require("@angular/router");
var platform_browser_1 = require("@angular/platform-browser");
var http_service_1 = require("../../services/http.service");
var JournalComponent = /** @class */ (function () {
    function JournalComponent(activatedRoute, sanitizer, http) {
        this.activatedRoute = activatedRoute;
        this.sanitizer = sanitizer;
        this.http = http;
        this._terms = [];
    }
    JournalComponent.prototype.sanitize = function (url) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    };
    JournalComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activatedRoute.queryParams.subscribe(function (queryParams) {
            if (queryParams.y) {
                _this.http.getFaculties(queryParams.y).subscribe(function (faculties) {
                    _this.activatedRoute.params.subscribe(function (params) {
                        _this.handleRouteParams(params, faculties);
                    });
                });
            }
            else {
                _this.http.getYears().subscribe(function (years) {
                    _this.http.getCurrentYear().subscribe(function (year) {
                        _this.http.getFaculties(year).subscribe(function (faculties) {
                            _this.activatedRoute.params.subscribe(function (params) {
                                _this.handleRouteParams(params, faculties);
                            });
                        });
                    });
                });
            }
        });
    };
    JournalComponent.prototype.handleRouteParams = function (params, faculties) {
        var fac = +params['fac'];
        var disc = +params['disc'];
        var faculty = faculties.find(function (f) { return f.id === fac; });
        var discipline = faculty.disciplines.find(function (d) { return d.id === disc; });
        this._terms = discipline.terms;
    };
    JournalComponent = __decorate([
        core_1.Component({
            selector: 'journal',
            templateUrl: "app/components/journal/journal.template.html",
            styleUrls: ["app/components/journal/journal.css"]
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute, platform_browser_1.DomSanitizer, http_service_1.HttpService])
    ], JournalComponent);
    return JournalComponent;
}());
exports.JournalComponent = JournalComponent;
//# sourceMappingURL=journal.component.js.map