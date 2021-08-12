import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  loginError: string = null;
  form: FormGroup;
  email: FormControl;
  password: FormControl;

  constructor(private router: Router,
    private userSessionService: UserSessionService,
    private loginService: LoginService,
    private usersService: UsersService) { }

  ngOnInit(): void {
    this.createFormControls();
    this.createFormGroup();
  }

  public login(): void {
    this.loginError = null;//reset with every login attemp

    this.loginService.login(this.email.value, this.password.value).subscribe(data => {
      //if successful, then retrieve user information. Implement that        
      let token = data['value'];
      if (token != null) {

        //I need to set the token in order to call the users endpoint
        this.userSessionService.setToken(token);
        this.usersService.findUser(this.email.value).subscribe(
          data => {
            //I can't treat data as User even if it holds the same values.
            //I need to create a User object to have access to it's methods.
            let foundUser = new User(data.username, data.uuid, data.roles, data.status, data.balance);
            this.userSessionService.setLoggedUser(foundUser);//we should get here a token back 
          },
          err => {
            this.loginError = 'Wrong username/password. Please verify.';
            this.userSessionService.logOut();
          }
        );
      } else {
        //Failed retrieving token. This looks odd.
        this.loginError = 'An internal error ocurred. Please try again..';
        this.userSessionService.logOut();
      }
      //going home
      this.router.navigate(['/']);
    },
      err => {
        this.loginError = (err.error && err.error.response) ? err.error.response : 'We couldn\'t reach the Server. Please try again';
      });
  }

  private createFormGroup(): void {
     this.form = new FormGroup({
      email: this.email,
      password: this.password
    });
  }

  private createFormControls(): void {
    this.email = new FormControl('', [Validators.email, Validators.required]);
    this.password = new FormControl('', [Validators.required]);
  }


}
