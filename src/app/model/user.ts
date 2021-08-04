const ROLE_ADMIN:string="ROLE_ADMIN"
export class User {
    

    username:string;
    roles:string[];
    status:string;
    balance:number;

    public isAdmin():boolean{
        return this.roles && (this.roles.indexOf(ROLE_ADMIN) > -1);
    }
}
