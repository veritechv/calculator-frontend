import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Configuration } from '../model/configuration';
import { AppsettingsService } from './appsettings.service';


const headers= {headers: new HttpHeaders({'Content-Type':'application/json'})};
const endpoint = '/system';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationsService {
  private apiBaseUrl:string;
  private apiVersion:string;

  constructor(private httpClient:HttpClient, private appSettingsService:AppsettingsService) { 
    this.apiBaseUrl = appSettingsService.getApiBaseUrl();
    this.apiVersion = appSettingsService.getApiVersion();
  }

  public systemConfigurations():Observable<Configuration[]>{
    return this.httpClient.get<Configuration[]>(this.buildUrl(), headers);
  }

  private buildUrl():string{
    return this.apiBaseUrl+endpoint;
  }
}
