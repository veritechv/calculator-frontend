import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { UserSessionService } from '../service/user-session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router, private userSessionService:UserSessionService) { }

  ngOnInit(): void {
  }

  public validateCredentials(username:string, password:string):boolean {
    console.log('credentials valid');
    console.log('here goes saving user information along with the token')
    var loggedUser = new User();
    loggedUser.username = 'username';
    loggedUser.roles = ['ROLE_ADMIN'];
    loggedUser.status='ACTIVE';
    loggedUser.balance= 100.0;
    this.userSessionService.setLoggedUser(loggedUser, 'my-token');//we should get here a token back 
    this.router.navigate(['/']);//after successful login we move to home
    return true;
  }

}
