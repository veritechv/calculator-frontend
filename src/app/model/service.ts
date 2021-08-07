const ACTIVE_STATUS:string="ACTIVE";

export class Service {
    constructor(public uuid:string = '', public name:string = '', public status:string = '', public cost:number = 0){ }    

    public isActive():boolean{
        return status!=null && this.status === ACTIVE_STATUS;
    }
}
