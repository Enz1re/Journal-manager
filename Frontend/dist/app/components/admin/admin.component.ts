import { Component, OnInit } from "@angular/core";
import { MatDialog } from '@angular/material';

import { ActivatedRoute } from "@angular/router";

import { HttpService } from "../../services/http.service";

import { Request } from "../../models/Request";
import { User } from "../../models/User";
import { Term } from "../../models/Term";

import { RequestsDialog } from "../popups/requests/requests.dialog";


@Component({
    selector: 'admin',
    templateUrl: "app/components/admin/admin.template.html",
    styleUrls: ["app/components/admin/admin.css"]
})
export class AdminComponent implements OnInit {
    private _pendingRequests: Request[] = [];
    private _faculties: any[] = [];
    private _year: string;
    private _terms: Term[] = [];
    private _currentTerm: Term = new Term();
    private _selectedFaculty = "";
    private _newFaculty = "";
    private _newDiscipline = "";
    private _tutors: User[] = [];

    constructor(private dialog: MatDialog, private http: HttpService, private route: ActivatedRoute) {

    }

    ngOnInit() {
        this.http.getPendingRequests().subscribe(requests => {
            this._pendingRequests = requests;
        });
        this.route.queryParams.subscribe(params => {
            if (params.y) {
                this._year = params.y;
                this.http.getFaculties(params.y).subscribe(faculties => {
                    this._faculties = faculties;
                });
            } else {
                this.http.getYearData().subscribe(yearData => {
                    this._year = yearData.currentYear.label;
                    this.http.getFaculties(yearData.currentYear.label).subscribe(faculties => {
                        this._faculties = faculties;
                    });
                });
            }
        });
        this.http.getTutors().subscribe(tutors => {
            this._tutors = tutors;
        });
    }

    addFaculty() {
        this.http.createFaculty(this._year, this._newFaculty).subscribe(faculty => {
            this._faculties.push(faculty);
        });
    }

    addDiscipline() {
        this.http.createDiscipline(this._selectedFaculty, this._newDiscipline, this._terms).subscribe(discipline => {

        });
    }
    
    addTerm() {
        this._terms.push(this._currentTerm);
        this._currentTerm = new Term();
    }

	notificationMessage() {
		const ending = this._pendingRequests.length > 1 ? 'а' : '';
		return `${this._pendingRequests.length} запрос${ending}.`;
	}
	
    showRequestList(e: Event) {
        e.preventDefault();

        const dialogRef = this.dialog.open(RequestsDialog, {
            width: '700px',
            height: '500px',
            data: { requests: this._pendingRequests }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
        });
    }
}
