import { Route } from "@angular/router";

import { MainPageComponent } from "./components/main-page/main-page.component";
import { AdminComponent } from "./components/admin/admin.component";
import { UserComponent } from "./components/user/user.component";
import { JournalComponent } from "./components/journal/journal.component";

import { AuthGuardAdmin } from "./services/authguard.admin.service";
import { AuthGuardUser } from "./services/authguard.user.service";


const routes: Route[] = [
    { path: '', component: MainPageComponent },
    { path: 'admin', component: AdminComponent, canActivate: [AuthGuardAdmin] },
    { path: 'user', component: UserComponent, canActivate: [AuthGuardUser] },
    { path: 'journal/:discipline', component: JournalComponent }
];

export default routes;