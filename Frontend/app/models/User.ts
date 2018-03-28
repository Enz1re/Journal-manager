export class User {
    firstName: string;
    lastName: string;
    patronymic: string;
    role: string;

    constructor(firstName: string, lastName: string, patronymic: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.patronymic = patronymic;
    }
}
