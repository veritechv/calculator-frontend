import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const SETTINGS_LOCATION = "/assets/app-settings.json";

@Injectable({
  providedIn: 'root'
})
export class AppsettingsService {
  private appConfig:any;

  constructor(private httpClient:HttpClient) { 
    this.loadSettings();
  }

  //importan to return the promise, because this is happening during 
  //initialization and we need to make angular wait until it's the file is loaded/resolved
  public loadSettings() {
    return this.httpClient.get(SETTINGS_LOCATION).toPromise().then(
      data=>{
        this.appConfig = data;
      }
    );
      
  }

  public getApiVersion(){
    return this.appConfig.apiVersion;
  }

  public getApiBaseUrl(){
    return this.appConfig.apiBaseUrl;
  }

  public getServiceStatusList():string[]{
    return this.appConfig.serviceStatus;
  }

}
