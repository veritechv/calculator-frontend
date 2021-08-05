import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { AppsettingsService } from './appsettings.service';

const headers= {headers: new HttpHeaders({'Content-Type':'application/json'})};
const baseEndpoint = '/users';
const listEndpoint = '/list'
const searchUserEndPoint = '/search';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiBaseUrl:string;
  private apiVersion:string;

  constructor(private httpClient:HttpClient, private appSettingsService:AppsettingsService) { 
    this.apiBaseUrl = appSettingsService.getApiBaseUrl();
    this.apiVersion = appSettingsService.getApiVersion();
  }

  public users():Observable<User[]>{
    return this.httpClient.get<User[]>(this.buildUrl(), headers);
  }

  public findUser(username:string):Observable<User>{
    // Setup log namespace query parameter
    let params = new HttpParams().set('username', username);
    return this.httpClient.get<User>(this.buildSearchUserUrl()+'/?username='+username, headers);
  }
  private buildUrl():string{
    return this.apiBaseUrl+baseEndpoint+listEndpoint;
  }

  private buildSearchUserUrl(){
    return this.apiBaseUrl+baseEndpoint+searchUserEndPoint;
  }
}
