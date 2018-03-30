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
import {
	MatSidenav,
    MatDialog,
	MatSelectChange,
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
	private _currentYear: string = null;

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
				this.http.getCurrentYear().subscribe(year => {
					this._selectedYear = this._currentYear = year;
					this._years = years;
					if (params.y) {
						this._selectedYear = params.y;
						if (this._selectedYear === this._currentYear) {
							this.router.navigate(['']);
						}
						this.http.getFaculties(this._selectedYear).subscribe(faculties => {
							this._faculties = faculties;
						});
					} else {
						this.http.getFaculties(this._selectedYear).subscribe(faculties => {
							this._faculties = faculties;
						});
					}
				});
            });
        });
    }

    login(e: Event) {
        e.preventDefault();

        const dialogRef = this.dialog.open(LoginDialog, {
            width: '400px',
        });

        dialogRef.afterClosed().subscribe(result => {
			if (!!result) {
				this.router.navigateByUrl('');
			}
        });
    }

	logOff(e: Event) {
		e.preventDefault();
		this.auth.logOff();
	}
	
	changeYear(event: MatSelectChange) {
		this._selectedYear = event.value;
		if (this._selectedYear === this._currentYear) {
			this.router.navigate(['']);
		} else {
			this.router.navigate([''], { queryParams: { y: this._selectedYear } });
		}
	}
	
	goToMain(e: Event) {
		e.preventDefault();
		this._currentDisciplineId = -1;
		this._currentFacultyId = -1;
		this.router.navigate([''], { queryParamsHandling: "merge" });
	}
	
    goToJournal(facId: number, discId: number) {
        this._currentDisciplineId = discId;
        this.router.navigate([`/journal/${facId}/${discId}`], { queryParamsHandling: "merge" });
    }
	
	goToUserPage(e: Event) {
		e.preventDefault();
		this.router.navigate(['/user']);
	}
}
