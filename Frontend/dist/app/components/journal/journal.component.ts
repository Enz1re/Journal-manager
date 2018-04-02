import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { DomSanitizer } from '@angular/platform-browser';
import { HttpService } from "../../services/http.service";

import { Term } from "../../models/Term";


@Component({
    selector: 'journal',
    templateUrl: "app/components/journal/journal.template.html",
    styleUrls: ["app/components/journal/journal.css"]
})
export class JournalComponent implements OnInit {
    private _terms: Term[] = [];

    constructor (private activatedRoute: ActivatedRoute, private sanitizer: DomSanitizer, private http: HttpService) {

    }

    sanitize(url: string) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }

    ngOnInit() {
		this.activatedRoute.queryParams.subscribe(queryParams => {
			if (queryParams.y) {
				this.http.getFaculties(queryParams.y).subscribe(faculties => {
					this.activatedRoute.params.subscribe(params => {
						this.handleRouteParams(params, faculties);
					});
				});
			} else {
				this.http.getYears().subscribe(years => {
					this.http.getCurrentYear().subscribe(year => {
						this.http.getFaculties(year).subscribe(faculties => {
							this.activatedRoute.params.subscribe(params => {
								this.handleRouteParams(params, faculties);
							});
						});
					});
				});
			}
		});
    }
	
	private handleRouteParams(params, faculties) {
		var fac = +params['fac'];
		var disc = +params['disc'];
		var faculty = faculties.find(f => f.id === fac);
		var discipline = faculty.disciplines.find(d => d.id === disc);
		this._terms = discipline.terms;
	}
}
