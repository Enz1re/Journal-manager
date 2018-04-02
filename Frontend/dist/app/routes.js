"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var main_page_component_1 = require("./components/main-page/main-page.component");
var admin_component_1 = require("./components/admin/admin.component");
var user_component_1 = require("./components/user/user.component");
var journal_component_1 = require("./components/journal/journal.component");
var authguard_admin_service_1 = require("./services/authguard.admin.service");
var authguard_user_service_1 = require("./services/authguard.user.service");
var routes = [
    { path: '', component: main_page_component_1.MainPageComponent },
    { path: 'admin', component: admin_component_1.AdminComponent, canActivate: [authguard_admin_service_1.AuthGuardAdmin] },
    { path: 'user', component: user_component_1.UserComponent, canActivate: [authguard_user_service_1.AuthGuardUser] },
    { path: 'journal/:fac/:disc', component: journal_component_1.JournalComponent }
];
exports.default = routes;
//# sourceMappingURL=routes.js.map