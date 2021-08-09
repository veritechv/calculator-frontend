import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { UserSessionService } from 'src/app/service/user-session.service';
import { UsersService } from 'src/app/service/users.service';

@Component({
  selector: 'app-user-profile-dialog',
  templateUrl: './user-profile-dialog.component.html',
  styleUrls: ['./user-profile-dialog.component.css']
})
export class UserProfileDialogComponent implements OnInit {
  user:User;

  constructor(private userSessionService:UserSessionService, private usersService:UsersService) { }

  ngOnInit(): void {
    //retrieve the user information everytime to show the current balance
    if(this.userSessionService.getLoggedUser()){
      this.usersService.findUser(this.userSessionService.getLoggedUser().username).subscribe(
        data=>{
          this.user = data;
        }
      );
    }    
  }

}
