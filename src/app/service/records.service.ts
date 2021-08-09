import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Record } from '../model/record';
import { AppsettingsService } from './appsettings.service';

const headers = new HttpHeaders().set('Content-Type', 'application/json');
const endpoint = '/records';

@Injectable({
  providedIn: 'root'
})
export class RecordsService {
  private apiBaseUrl: string;
  private apiVersion: string;

  constructor(private httpClient: HttpClient, private appSettingsService: AppsettingsService) {
    this.apiBaseUrl = appSettingsService.getApiBaseUrl();
    this.apiVersion = appSettingsService.getApiVersion();
  }

  public records(pageIndex: number, pageSize: number, sortField: string, username: string, isAdmin: boolean): Observable<Record[]> {
    //for some reason HttpParamsOptions is not found, building params by hand
    const httpParams: HttpParams = new HttpParams().
      append('pageIndex', pageIndex + '').
      append('pageSize', pageSize + '').
      append('sortBy', sortField);

    const options = { params: httpParams, headers: headers };
    let url = this.buildUrl();
    url = isAdmin ? url + '/admin' : url + '/' + username;

    return this.httpClient.get<Record[]>(url, options);
  }

  public update(record: Record): Observable<Record> {
    return this.httpClient.put<Record>(this.buildUrl(), record);
  }

  public delete(recordUuid: string): Observable<string> {
    return this.httpClient.delete<string>(this.buildUrl() + '/' + recordUuid);
  }

  private buildUrl(): string {
    return this.apiBaseUrl + endpoint;
  }
}
