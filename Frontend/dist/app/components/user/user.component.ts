import { Component } from "@angular/core";

import { AuthService } from "../../services/auth.service";


@Component({
    selector: 'user',
    templateUrl: "app/components/user/user.template.html",
    styleUrls: ["app/components/user/user.css"]
})
export class UserComponent {
    constructor (private auth: AuthService) {
		
	}
}