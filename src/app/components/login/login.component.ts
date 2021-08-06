import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../model/user';
import { LoginService } from '../../service/login.service';
import { UserSessionService } from '../../service/user-session.service';
import { UsersService } from '../../service/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router, 
    private userSessionService:UserSessionService, 
    private loginService:LoginService,
    private usersService:UsersService) { }

  ngOnInit(): void {
  }

  public validateCredentials(username:string, password:string):void {
    console.log('credentials valid');
    console.log('here goes saving user information along with the token');
    
    this.loginService.login(username, password).subscribe(data=>{
        //if successful, then retrieve user information. Implement that        
        let token = data['value'];        
        if(token!=null){
          console.log('token acquired');
          //I need to set the token in order to call the users endpoint
          this.userSessionService.setToken(token);
          this.usersService.findUser(username).subscribe(
            data=>{              
              //I can't treat data as User even if it holds the same values.
              //I need to create a User object to have access to it's methods.
              let foundUser = new User(data.username, data.roles, data.status, data.balance);
              this.userSessionService.setLoggedUser(foundUser);//we should get here a token back 
            },
            err=>{
              console.log("Wrong username/password. Please verify.")
              this.userSessionService.logOut();
            }
          );
        }else{
          console.log('Failed retrieving token. This looks odd.')
          this.userSessionService.logOut();
        }
        //going home
        this.router.navigate(['/']);        
    },
    err=>{
      console.log('login failed');//probably we should throw and error to show a message
    });

    
  }

}
