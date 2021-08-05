import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { UserSessionService } from '../service/user-session.service';
import { UsersService } from '../service/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loggedUser:User | null = null;;
  isLogged:boolean;

  constructor(private userSessionService:UserSessionService, 
    private usersService:UsersService) { }

  ngOnInit(): void {
    this.loggedUser = this.userSessionService.getLoggedUser();
    this.isLogged = this.userSessionService.isLogged();

    this.userSessionService.getLoggedUser$().subscribe(user=>{
      this.loggedUser = user;
      this.isLogged = true;
    });
  }
}
