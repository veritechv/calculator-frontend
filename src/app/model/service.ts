const ACTIVE_STATUS:string = "ACTIVE";
const FREE_FORM_TYPE:string = "FREE_FORM"

export class Service {

    constructor(public uuid:string = '', public name:string = '', 
    public description:string = '', public type:string = '',
    public status:string = '', public cost:number = 0, public numParameters:number = 1){ }    

    public isActive():boolean{
        return this.status!=null && this.status === ACTIVE_STATUS;   
    }

    public isFreeForm():boolean{
        return this.type && (this.type === FREE_FORM_TYPE);
    }
}
