import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from '@angular/router';

import { AngularMaterialModule } from "./angular-material.module";

import { RootComponent } from "./root/root.component";
import { MainPageComponent } from "./main-page/main-page.component";
import { AdminComponent } from "./admin/admin.component";
import { UserComponent } from "./user/user.component";
import { JournalComponent } from "./journal/journal.component";

import routes from "../routes";


@NgModule({
    declarations: [
        RootComponent,
        UserComponent,
        AdminComponent,
        JournalComponent,
        MainPageComponent
    ],
    imports: [
        CommonModule,
        AngularMaterialModule,
        RouterModule.forRoot(routes),
    ],
    exports: [
        RootComponent,
        UserComponent,
        AdminComponent,
        JournalComponent,
        MainPageComponent
    ],
})
export class ComponentsModule {

}