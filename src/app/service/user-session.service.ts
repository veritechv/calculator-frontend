import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User } from '../model/user';

const TOKEN_KEY = 'AuthToken';

@Injectable({
  providedIn: 'root'
})
export class UserSessionService {
  private loggedUser$:Subject<User>;
  private loggedUser:User;
  
  constructor() { 
    this.loggedUser$ = new Subject<User>();
  }

  public setLoggedUser(user:User){
    this.loggedUser = user;    
    this.loggedUser$.next(this.loggedUser);
  }

  public getToken():string{
    var token = sessionStorage.getItem(TOKEN_KEY);
    console.log('getting token:'+ token);
    return token;
    
  }

  public setToken(token:string):void{
    sessionStorage.removeItem(TOKEN_KEY);
    console.log('Removing and setting a new token:'+token);
    sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getLoggedUser(): User{
    return this.loggedUser;
  }

  public getLoggedUser$():Observable<User>{
    return this.loggedUser$.asObservable();
  }

  public logOut():void{
    console.log('calling clear storage');
    sessionStorage.clear();
    console.log('removing user in session');
    this.loggedUser = null;
    console.log('sending notification of log out');
    this.loggedUser$.next(this.loggedUser);
    
  }

  public isLogged(){
    return (this.loggedUser!=null);
  }
}
