import { Component, Inject } from '@angular/core';
import {
    MatDialog,
    MatDialogRef,
    MAT_DIALOG_DATA
} from '@angular/material';

import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

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

    constructor(public dialogRef: MatDialogRef<RequestsDialog>, @Inject(MAT_DIALOG_DATA) data: Request[]) {
		for (let i = 0; i < data.requests.length; i++) {
			data.requests[i].issuedAt = new Date(data.requests[i].issuedAt).toLocaleString();
		}
        this._dataSource = new MatTableDataSource<Request>(data.requests);
    }

	acceptRequest() {
		const selected = this._selection.selected[0];
		this._dataSource.data.splice(this._dataSource.data.indexOf(selected), 1);
		this._dataSource = new MatTableDataSource<Request>(this._dataSource.data);
		this._selection = new SelectionModel<Request>(false, []);
	}
	
    onCancelClick(): void {
        this.dialogRef.close();
    }
}
