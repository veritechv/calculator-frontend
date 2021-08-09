/**
 * This object holds the necessary data to execute the 
 * service.
 */
export class ServiceRequest {
    constructor(public serviceUuid:string='', 
    public username:string='', 
    public parameters:string[] = []){}
}
