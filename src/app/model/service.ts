export class Service {
    uuid:string;
    name:string;
    status:string;
    cost:number;

    constructor(uuid:string, name:string, status:string, cost:number){
        this.uuid=uuid;
        this.name=name;
        this.status=status;
        this.cost=cost;
    }
}
