import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Record } from '../model/record';

import { AppsettingsService } from './appsettings.service';

const headers= {headers: new HttpHeaders({'Content-Type':'application/json'})};
const endpoint = '/records';

@Injectable({
  providedIn: 'root'
})
export class RecordsService {
  private apiBaseUrl:string;
  private apiVersion:string;

  constructor(private httpClient:HttpClient, private appSettingsService:AppsettingsService) { 
    this.apiBaseUrl = appSettingsService.getApiBaseUrl();
    this.apiVersion = appSettingsService.getApiVersion();
  }

  public records():Observable<Record[]>{
    return this.httpClient.get<Record[]>(this.buildUrl()+'/list', headers);
  }

  public userRecords(username:string):Observable<Record[]>{
    return this.httpClient.get<Record[]>(this.buildUrl()+'/list?username'+username, headers);
  }

  private buildUrl():string{
    return this.apiBaseUrl+endpoint;
  }
}
