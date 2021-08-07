import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Service } from '../model/service';
import { AppsettingsService } from './appsettings.service';


const headers = new HttpHeaders().set('Content-Type', 'application/json');
const endpoint = '/services';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
    private apiBaseUrl:string;
    private apiVersion:string;

  constructor(private httpClient:HttpClient, private appSettingsService:AppsettingsService) { 
    this.apiBaseUrl = appSettingsService.getApiBaseUrl();
    this.apiVersion = appSettingsService.getApiVersion();
  }

  public services(pageIndex:number, pageSize:number, sortingField:string):Observable<Service[]>{        
    //for some reason HttpParamsOptions is not found, building params by hand
    const httpParams:HttpParams = new HttpParams().
    append('pageIndex', pageIndex+'').
    append('pageSize', pageSize+'').
    append('sortBy', sortingField);

    const options = { params: httpParams, headers: headers };

    return this.httpClient.get<Service[]>(this.buildUrl()+'/list', options);
  }

  public update(service:Service):Observable<Service>{
    return this.httpClient.put<Service>(this.buildUrl(),service);
  }

  private buildUrl():string{    
    return  this.apiBaseUrl+endpoint;    
  }
}
