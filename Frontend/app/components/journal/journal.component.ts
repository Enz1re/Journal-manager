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
        this.activatedRoute.params.subscribe(params => {
            console.log(params);
            this.http.getDiscipline(+params['disc']).subscribe(discipline => {
                console.log(discipline);
                this._terms = discipline.terms;
            })
        });
    }
}
