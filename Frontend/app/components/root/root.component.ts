import { 
    OnInit,
    NgZone,
    Component,
} from "@angular/core";

import { CommonModule } from "@angular/common";

import { Router } from "@angular/router";

import { Faculty } from "../../models/Faculty";

import { MainPageComponent } from "../../components/main-page/main-page.component";
import { MatSidenav, MatDrawerContainer } from "@angular/material";

import { HttpService } from "../../services/http.service";


@Component({
    selector: "jm-root",
    templateUrl: "app/components/root/root.template.html",
    styleUrls: ["app/components/root/root.css"],
})
export class RootComponent implements OnInit {
    private _years: string[] = [];
    private _faculties: Faculty[] = [];
    private _selectedYear: string;

    constructor (private http: HttpService) {
        
    }

    ngOnInit() {
        this.http.getYears().subscribe(years => {
            this._years = years;
            this.http.getCurrentYear().subscribe(year => {
                this._selectedYear = year;
                this.http.getFaculties(year).subscribe(faculties => {
                    this._faculties = faculties;
                })
            });
        });
    }
}