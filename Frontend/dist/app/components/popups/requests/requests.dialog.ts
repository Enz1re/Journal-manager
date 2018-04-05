import { Component, Inject } from '@angular/core';
import {
    MatDialog,
    MatDialogRef,
    MAT_DIALOG_DATA
} from '@angular/material';

import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

import { HttpService } from "../../../services/http.service";

import { Request } from "../../../models/Request";


@Component({
	selector: 'requests',
	templateUrl: 'app/components/popups/requests/requests.template.html',
	styleUrls: ['app/components/popups/requests/requests.css']
})
export class RequestsDialog {
    private _displayedColumns = ['select', 'id', 'issuedAt', 'issuer', 'title'];
    private _dataSource: MatTableDataSource<Request>;
	private _selection = new SelectionModel<Request>(false, []);

    constructor(public dialogRef: MatDialogRef<RequestsDialog>, private http: HttpService, @Inject(MAT_DIALOG_DATA) data: any) {
		for (let i = 0; i < data.requests.length; i++) {
			data.requests[i].date = new Date(data.requests[i].date).toLocaleString();
		}
        this._dataSource = new MatTableDataSource<Request>(data.requests);
    }

	acceptRequest() {
        const selected = this._selection.selected[0];
        this.http.acceptPendingRequest(selected).subscribe(response => {
            this.removeFromList(selected);
        });
	}

    declineRequest() {
        const selected = this._selection.selected[0];
        this.http.declinePendingRequest(selected).subscribe(response => {
            this.removeFromList(selected);
        })
    }

    onCancelClick(): void {
        this.dialogRef.close();
    }

    private removeFromList(request: Request) {
        this._dataSource.data.splice(this._dataSource.data.indexOf(request), 1);
        this._dataSource = new MatTableDataSource<Request>(this._dataSource.data);
        this._selection = new SelectionModel<Request>(false, []);
    }
}
