import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { AppsettingsService } from './appsettings.service';

const headers = new HttpHeaders().set('Content-Type', 'application/json');
const baseEndpoint = '/users';
const userRolesEndpoint = "/roles";
const userStatusesEndpoint = "/statuses";

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

  public users(pageIndex:number, pageSize:number, sortingField:string):Observable<User[]>{
    const httpParams: HttpParams = new HttpParams().
    append('pageIndex', pageIndex + '').
    append('pageSize', pageSize + '').
    append('sortBy', sortingField);

    const options = { params: httpParams, headers: headers };

    return this.httpClient.get<User[]>(this.buildUrl(), options);

  }

  public findUser(username:string):Observable<User>{
    // Setup log namespace query parameter
    return this.httpClient.get<User>(this.buildSearchUserUrl()+'/'+username);
  }

  public delete(user: User): Observable<string> {
    return this.httpClient.delete<string>(this.buildUrl() + '/' + user.username);
  }

  public update(user: User): Observable<User> {
    return this.httpClient.put<User>(this.buildUrl(), user);
  }

  public userRolesList():Observable<string[]>{
    return this.httpClient.get<string[]>(this.buildUrl()+userRolesEndpoint);
  }

  public userStatusesList():Observable<string[]>{
    return this.httpClient.get<string[]>(this.buildUrl()+userStatusesEndpoint);
  }


  private buildUrl():string{
    return this.apiBaseUrl+baseEndpoint;
  }

  private buildSearchUserUrl(){
    return this.apiBaseUrl+baseEndpoint;
  }
}
