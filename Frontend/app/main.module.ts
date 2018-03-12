import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { ComponentsModule } from './components/components.module';

import { RootComponent } from './components/root/root.component';

import { HttpService } from './services/http.service';


@NgModule({
    imports: [
        HttpModule,
        BrowserModule,
        ReactiveFormsModule,
        ComponentsModule,
    ],
    providers: [HttpService],
    bootstrap: [RootComponent]
})
export class JmModule {

}