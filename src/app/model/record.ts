import { Service } from "./service";
import { User } from "./user";

export class Record {
    uuid:string;
    service:Service;
    user:User;
    cost:number;
    balance:number;
    response:string;
    date:number;//TODO we should change this to moment.js

}
