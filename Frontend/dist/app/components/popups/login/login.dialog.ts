import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'login',
  templateUrl: 'app/components/popups/login/login.template.html',
})
export class LoginDialog {
    private _username: string;
    private _password: string;
    private _error: boolean = false;

    constructor(public dialogRef: MatDialogRef<LoginDialog>, private auth: AuthService) {

    }

    onOkClick() {
        this.auth.logIn(this._username, this._password).subscribe(response => {
            this._error = false;
            if (response) {
                this.dialogRef.close(true);
            }
        },
        error => {
            this._error = true;
        });
    }
}
