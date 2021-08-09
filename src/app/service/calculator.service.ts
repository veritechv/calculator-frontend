import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceRequest } from '../model/service-request';
import { ServiceResponse } from '../model/service-response';
import { AppsettingsService } from './appsettings.service';


const headers = new HttpHeaders().set('Content-Type', 'application/json');
const endpoint = '/calculator/execute';
@Injectable({
  providedIn: 'root'
})
export class CalculatorService{
  private apiBaseUrl:string;
  private apiVersion:string;

  constructor(private httpClient:HttpClient, private appSettingsService:AppsettingsService) { 
    this.apiBaseUrl = appSettingsService.getApiBaseUrl();
    this.apiVersion = appSettingsService.getApiVersion();
  }

  /**
   * This will request the execution of a service.
   * The best fit that I could find to do this was the PATCH request, because I'm going to produce
   * some kind of modification, eg change user's balance
   * @param serviceRequest Object with information to execute the service
   * @returns The outcome of the execution
   */
  public execute(serviceRequest:ServiceRequest):Observable<ServiceResponse>{
    return this.httpClient.patch<ServiceResponse>(this.buildUrl(), serviceRequest);
  }

  private buildUrl():string{    
    return  this.apiBaseUrl+endpoint;    
  }
}
