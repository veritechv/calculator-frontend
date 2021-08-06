
export class Record {
    constructor(public uuid:string = '', public service:string = '', 
        public username:string = '', public cost:number = 0, 
        public balance:number = 0, public response:string = '', 
        public date:number = 0){

    }//TODO we should change this to moment.js

    

}
