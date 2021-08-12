import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const SETTINGS_LOCATION = "/assets/app-settings.json";

/**
 * The purpose of this class is to concentrate the access to
 * application and environment variables in one place
 * The file app-settings.json will hold values specific to the business logic of the application
 * while the environment*.ts files will have values to access third parties, passworks, keys, etc
 */
@Injectable({
  providedIn: 'root'
})
export class AppsettingsService {
  private appConfig:any;

  constructor(private httpClient:HttpClient) { 
    this.loadSettings();
  }

  //important to return the promise, because this is happening during 
  //initialization and we need to make angular wait until it's the file is loaded/resolved
  public loadSettings() {
    return this.httpClient.get(SETTINGS_LOCATION).toPromise().then(
      data=>{
        this.appConfig = data;
      }
    );
      
  }

  public getApiVersion(){
    return environment.apiVersion;
  }

  public getApiBaseUrl(){
    return environment.apiBaseUrl+'/'+environment.apiVersion;
  }

  public getServiceStatusList():string[]{
    return this.appConfig.serviceStatus;
  }

}
