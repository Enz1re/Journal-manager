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
	private _role = "admin";
    private _error: boolean = false;

    constructor(public dialogRef: MatDialogRef<LoginDialog>, private auth: AuthService) {

    }

    onOkClick(): void {
        if (this.auth.logIn(this._username, this._password, this._role) === null) {
            this._error = true;
        } else {
            this._error = false;
            this.dialogRef.close({ username: this._username, password: this._password });
        }
    }
}
