import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserSessionService } from '../service/user-session.service';

@Injectable({
  providedIn: 'root'
})
export class NavigationGuard implements CanActivate {
  constructor(private userSessionService:UserSessionService, private router:Router){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if(!this.userSessionService.getToken() || !this.userSessionService.getLoggedUser()){
      this.router.navigate(['/']);//lets go home
      return false;
    }
    return true;
  }
  
}
