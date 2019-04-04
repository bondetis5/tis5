export class UserModel {
    name: string;
    email: string;
    league_name: string;
    password: string;
    password_confirmation: string;

    constructor(user: UserModel){
        this.name = user.name;
        this.email = user.email;
        this.league_name = user.league_name;
        this.password = user.password;
        this.password_confirmation = user.password_confirmation;
    }
}