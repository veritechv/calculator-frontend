//where to put this?
//1.could it come from the backend with a flag saying if it's an admin (*)
//2.could it be set when mapping result from response in users service

const ROLE_ADMIN:string="ROLE_ADMIN";

export class User {
    username:string;
    roles:string[];
    status:string;
    balance:number;

    constructor(username:string, roles:string[], status:string, balance:number){
        this.username = username;
        this.roles = roles;
        this.status = status;
        this.balance = balance;
    }

    public isAdmin():boolean{
        return this.roles && (this.roles.indexOf(ROLE_ADMIN) > -1);
    }
}
