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
require("rxjs/add/operator/map");
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var HttpService = /** @class */ (function () {
    function HttpService(http) {
        this.http = http;
    }
    /**
     * Data
     */
    HttpService.prototype.getYearData = function () {
        return this.http.get("http://localhost:62774/api/Data/Year")
            .map(function (response) { return response; });
    };
    HttpService.prototype.getFaculties = function (year) {
        return this.http.get("http://localhost:62774/api/Data/Faculties/" + year)
            .map(function (response) { return response.faculties; });
    };
    HttpService.prototype.getFaculty = function (id) {
        return this.http.get("http://localhost:62774/api/Data/Faculty/" + id)
            .map(function (response) { return response; });
    };
    HttpService.prototype.getDisciplines = function (facultyId) {
        return this.http.get("http://localhost:62774/api/Data/Disciplines/" + facultyId)
            .map(function (response) { return response.disciplines; });
    };
    HttpService.prototype.getDiscipline = function (id) {
        return this.http.get("http://localhost:62774/api/Data/Discipline/" + id)
            .map(function (response) { return response; });
    };
    /**
     * Admin
     */
    HttpService.prototype.getPendingRequests = function () {
        return this.http.get("http://localhost:62774/api/Admin/Request/Pending").map(function (response) { return response; });
    };
    HttpService.prototype.getTutors = function () {
        return this.http.get("http://localhost:62774/api/Admin/Tutors").map(function (response) { return response; });
    };
    HttpService.prototype.acceptPendingRequest = function (request) {
        console.log(request);
        return this.http.post("http://localhost:62774/api/Admin/Request/Accept", request).map(function (response) { return response; });
    };
    HttpService.prototype.declinePendingRequest = function (request) {
        return this.http.post("http://localhost:62774/api/Admin/Request/Decline", request).map(function (response) { return response; });
    };
    HttpService.prototype.createYear = function (yearLabel) {
        return this.http.post("http://localhost:62774/api/Admin/Create/Year/" + yearLabel, {})
            .map(function (response) { return response; });
    };
    HttpService.prototype.createDiscipline = function (facName, discName, terms) {
        return this.http.post("http://localhost:62774/api/Admin/Create/Discipline", { facultyName: facName, disciplineName: discName, terms: terms })
            .map(function (response) { return response; });
    };
    HttpService.prototype.createTerm = function (discId, term) {
        return this.http.post("http://localhost:62774/api/Admin/Create/Term/" + discId, term).map(function (response) { return response; });
    };
    HttpService.prototype.createFaculty = function (year, facName) {
        return this.http.post("http://localhost:62774/api/Admin/Create/Faculty", { year: year, facultyName: facName })
            .map(function (response) { return response; });
    };
    HttpService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], HttpService);
    return HttpService;
}());
exports.HttpService = HttpService;
//# sourceMappingURL=http.service.js.map