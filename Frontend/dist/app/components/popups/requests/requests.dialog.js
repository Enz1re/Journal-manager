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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var material_1 = require("@angular/material");
var material_2 = require("@angular/material");
var collections_1 = require("@angular/cdk/collections");
var RequestsDialog = /** @class */ (function () {
    function RequestsDialog(dialogRef, data) {
        this.dialogRef = dialogRef;
        this._displayedColumns = ['select', 'id', 'issuedAt', 'issuer', 'title'];
        this._selection = new collections_1.SelectionModel(false, []);
        for (var i = 0; i < data.requests.length; i++) {
            data.requests[i].issuedAt = new Date(data.requests[i].issuedAt).toLocaleString();
        }
        this._dataSource = new material_2.MatTableDataSource(data.requests);
    }
    RequestsDialog.prototype.acceptRequest = function () {
        var selected = this._selection.selected[0];
        this._dataSource.data.splice(this._dataSource.data.indexOf(selected), 1);
        this._dataSource = new material_2.MatTableDataSource(this._dataSource.data);
        this._selection = new collections_1.SelectionModel(false, []);
    };
    RequestsDialog.prototype.onCancelClick = function () {
        this.dialogRef.close();
    };
    RequestsDialog = __decorate([
        core_1.Component({
            selector: 'requests',
            templateUrl: 'app/components/popups/requests/requests.template.html',
            styleUrls: ['app/components/popups/requests/requests.css']
        }),
        __param(1, core_1.Inject(material_1.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [material_1.MatDialogRef, Object])
    ], RequestsDialog);
    return RequestsDialog;
}());
exports.RequestsDialog = RequestsDialog;
//# sourceMappingURL=requests.dialog.js.map