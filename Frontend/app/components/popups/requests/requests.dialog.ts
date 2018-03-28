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
})
export class RequestsDialog {
    private _displayedColumns = ['id', 'issuedAt', 'issuer', 'title'];
    private _selection = new SelectionModel<Request>(false, []);
    private _dataSource: MatTableDataSource<Request>;

    constructor(public dialogRef: MatDialogRef<RequestsDialog>, @Inject(MAT_DIALOG_DATA) public requests: Request[]) {
        this._dataSource = new MatTableDataSource<Request>(requests);
    }

    onCancelClick(): void {
        this.dialogRef.close();
    }
}
