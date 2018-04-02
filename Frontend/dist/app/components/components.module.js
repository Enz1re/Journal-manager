"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var angular_material_module_1 = require("./angular-material.module");
var root_component_1 = require("./root/root.component");
var main_page_component_1 = require("./main-page/main-page.component");
var admin_component_1 = require("./admin/admin.component");
var user_component_1 = require("./user/user.component");
var journal_component_1 = require("./journal/journal.component");
var requests_dialog_1 = require("./popups/requests/requests.dialog");
var login_dialog_1 = require("./popups/login/login.dialog");
var routes_1 = require("../routes");
var ComponentsModule = /** @class */ (function () {
    function ComponentsModule() {
    }
    ComponentsModule = __decorate([
        core_1.NgModule({
            declarations: [
                root_component_1.RootComponent,
                user_component_1.UserComponent,
                admin_component_1.AdminComponent,
                journal_component_1.JournalComponent,
                main_page_component_1.MainPageComponent,
                requests_dialog_1.RequestsDialog,
                login_dialog_1.LoginDialog
            ],
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                angular_material_module_1.AngularMaterialModule,
                router_1.RouterModule.forRoot(routes_1.default),
            ],
            exports: [
                root_component_1.RootComponent,
                user_component_1.UserComponent,
                admin_component_1.AdminComponent,
                journal_component_1.JournalComponent,
                main_page_component_1.MainPageComponent
            ],
            entryComponents: [
                requests_dialog_1.RequestsDialog,
                login_dialog_1.LoginDialog
            ]
        })
    ], ComponentsModule);
    return ComponentsModule;
}());
exports.ComponentsModule = ComponentsModule;
//# sourceMappingURL=components.module.js.map