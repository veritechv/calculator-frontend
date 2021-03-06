import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Service } from '../model/service';
import { AppsettingsService } from './appsettings.service';


const headers = new HttpHeaders().set('Content-Type', 'application/json');
const endpoint = '/services';
const listEndpoint = '/list';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  private apiBaseUrl: string;
  private apiVersion: string;

  constructor(private httpClient: HttpClient, private appSettingsService: AppsettingsService) {
    this.apiBaseUrl = appSettingsService.getApiBaseUrl();
    this.apiVersion = appSettingsService.getApiVersion();
  }

  public services(pageIndex: number, pageSize: number, sortingField: string, isAdmin:boolean): Observable<Service[]> {
    //for some reason HttpParamsOptions is not found, building params by hand
    const httpParams: HttpParams = new HttpParams().
      append('pageIndex', pageIndex + '').
      append('pageSize', pageSize + '').
      append('sortBy', sortingField);

    const options = { params: httpParams, headers: headers };
    let url = this.buildUrl() + listEndpoint;
    url = isAdmin ? url+'/admin' : url;

    return this.httpClient.get<Service[]>(url, options);
  }

  public update(service: Service): Observable<Service> {
    return this.httpClient.put<Service>(this.buildUrl(), service);
  }

  public delete(service: Service): Observable<string> {
    return this.httpClient.delete<string>(this.buildUrl() + '/' + service.uuid);
  }

  public create(service: Service): Observable<Service> {
    return this.httpClient.post<Service>(this.buildUrl(), service);
  }

  /**
   * Gets the list of available service statuses in the app
   * This could be changed for a backend call to avoid having this 
   * in the config file
   */
  public serviceStatusList(): string[] {
    return this.appSettingsService.getServiceStatusList();
  }

  public serviceTypes(): Observable<string[]> {
    return this.httpClient.get<string[]>(this.buildUrl() + '/types');
  }

  private buildUrl(): string {
    return this.apiBaseUrl + endpoint;
  }
}
