import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { UserSessionService } from '../service/user-session.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loggedUser:User | null = null;;
  isLogged:boolean;

  constructor(private userSessionService:UserSessionService) { }

  ngOnInit(): void {
    this.isLogged = this.userSessionService.isLogged();
    if(this.isLogged){
      this.loggedUser = this.userSessionService.getLoggedUser();
    }

    this.userSessionService.getLoggedUser$().subscribe(user=>{
      this.loggedUser = user;
      this.isLogged = true;
    });
  }

}
