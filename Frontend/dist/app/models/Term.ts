import { User } from "../models/User";


export class Term {
    number: number;
    type: string;
    spreadsheetUrl: string;
    tutors: User[];

    constructor() {
        this.number = -1;
        this.type = "";
        this.spreadsheetUrl = "";
        this.tutors = [];
    }
}