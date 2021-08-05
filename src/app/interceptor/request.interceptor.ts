import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserSessionService } from '../service/user-session.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor(private userSessionService:UserSessionService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let authorizedRequest = request;
    const token = this.userSessionService.getToken();
    if(token!=null){
      authorizedRequest = authorizedRequest.clone({headers:request.headers.set('Authorization', 'Bearer '+token)});
    }

    return next.handle(authorizedRequest);
  }
}

export const requestInterceptor = [{provide:HTTP_INTERCEPTORS, useClass:RequestInterceptor, multi:true}];
