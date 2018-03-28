import {
    OnInit,
    NgZone,
    Component,
} from "@angular/core";

import { CommonModule, Location } from "@angular/common";

import { Router, ActivatedRoute } from "@angular/router";

import { Faculty } from "../../models/Faculty";
import { Term } from "../../models/Term";

import { MainPageComponent } from "../../components/main-page/main-page.component";
import { MatSidenav,
         MatDialog,
         MatDrawerContainer
} from "@angular/material";

import { HttpService } from "../../services/http.service";
import { AuthService } from "../../services/auth.service";

import { LoginDialog } from "../popups/login/login.dialog";


@Component({
    selector: "jm-root",
    templateUrl: "app/components/root/root.template.html",
    styleUrls: ["app/components/root/root.css"],
})
export class RootComponent implements OnInit {
    private _years: string[] = [];
    private _faculties: Faculty[] = [];
    private _currentFacultyId: number = -1;
    private _currentDisciplineId: number = -1;
    private _selectedYear: string = null;

    constructor (private router: Router, private location: Location, private route: ActivatedRoute,
                 private dialog: MatDialog, private auth: AuthService, private http: HttpService) {
        const params = location.path().split('?')[0].split('/');
        const facId = +params[2];
        const discId = +params[3];
        this._currentFacultyId = facId;
        this._currentDisciplineId = discId;
    }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            this.http.getYears().subscribe(years => {
                this._years = years;
                if (params.y) {
                    this._selectedYear = params.y;
                    this.http.getFaculties(this._selectedYear).subscribe(faculties => {
                        this._faculties = faculties;
                    });
                } else {
                    this.http.getCurrentYear().subscribe(year => {
                        this._selectedYear = year;
                        this.http.getFaculties(year).subscribe(faculties => {
                            this._faculties = faculties;
                        });
                    });
                }
            });
        });
    }

    login(e: Event) {
        e.preventDefault();

        const dialogRef = this.dialog.open(LoginDialog, {
            width: '400px',
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
        });
    }

    goToJournal(facId: number, discId: number) {
        this._currentDisciplineId = discId;
        this.router.navigate([`/journal/${facId}/${discId}`]);
    }
}
