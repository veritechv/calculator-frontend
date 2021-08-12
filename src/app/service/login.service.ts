import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserCredentials } from '../model/user-credentials';
import { AppsettingsService } from './appsettings.service';

const headers = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
const baseEndpoint = '/login';
const endpointLogin = '/authenticate';
const endpointSignup = '/signup';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiBaseurl: string;
  private apiVersion: string;

  constructor(private httpClient: HttpClient, private appSettingsService: AppsettingsService) {
    this.apiBaseurl = appSettingsService.getApiBaseUrl();
    this.apiVersion = appSettingsService.getApiVersion();
  }

  public login(username: string, password: string): Observable<Token> {
    var credentials = { 'username': username, 'password': password };
    return this.httpClient.post<Token>(this.buildUrlLogin(), credentials, headers);
  }

  public signUp(username: string, password: string): Observable<string> {
    var credentials = new UserCredentials();
    credentials.username = username;
    credentials.password = password;
    return this.httpClient.post<string>(this.buildUrlRegister(), credentials, headers);
  }

  private buildUrlLogin(): string {
    return this.apiBaseurl + baseEndpoint + endpointLogin;
  }

  private buildUrlRegister(): string {
    return this.apiBaseurl + baseEndpoint + endpointSignup;
  }
}
