import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Service } from '../model/service';
import { AppsettingsService } from './appsettings.service';

const headers= {headers: new HttpHeaders({'Content-Type':'application/json'})};
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

  public services():Observable<Service[]>{
    return this.httpClient.get<Service[]>(this.buildUrl()+'/list', headers);
  }

  private buildUrl():string{
    return this.apiBaseUrl+endpoint;
  }
}
