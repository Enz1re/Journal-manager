import { Component, OnInit } from "@angular/core";
import { MatDialog } from '@angular/material';

import { HttpService } from "../../services/http.service";

import { Request } from "../../models/Request";

import { RequestsDialog } from "../popups/requests/requests.dialog";


@Component({
    selector: 'admin',
    templateUrl: "app/components/admin/admin.template.html",
    styleUrls: ["app/components/admin/admin.css"]
})
export class AdminComponent implements OnInit {
    private _pendingRequests: Request[] = [];

    constructor(private dialog: MatDialog, private http: HttpService) {

    }

    ngOnInit() {
        this.http.getPendingRequests().subscribe(requests => {
            this._pendingRequests = requests;
        });
    }

    showRequestList(e: Event) {
        e.preventDefault();

        const dialogRef = this.dialog.open(RequestsDialog, {
            width: '400px',
            height: '500px',
            data: { requests: this._pendingRequests }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
        });
    }
}
