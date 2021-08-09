import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../model/user';
import { UserSessionService } from '../../service/user-session.service';
import { UserProfileDialogComponent } from '../user-profile-dialog/user-profile-dialog.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  loggedUser:User | null = null;;
  isLogged:boolean;
  

  constructor(private router:Router, private userSessionService:UserSessionService,
    private dialog:MatDialog) { 
    this.isLogged = false;
  }

  ngOnInit(): void {
    //because after every redirect this component is reloaded, the isLogged property returns to false
    //so to set it right I need to check with the userSessionService to see if the login already happened
    //the subscribe is only useful when the user is logged out
    this.isLogged = this.userSessionService.isLogged();
    if(this.isLogged){
      this.loggedUser = this.userSessionService.getLoggedUser();
    }

    this.userSessionService.getLoggedUser$().subscribe(user=>{
      this.loggedUser = user;
      this.isLogged = true;
    });
  }
  
  public myProfile(){
    this.dialog.open(UserProfileDialogComponent);
  }

  public logOut():void{
    this.userSessionService.logOut();
    this.router.navigate(["/login"]);
  }


  public isUserAdmin():boolean{
    return this.loggedUser && this.loggedUser.isAdmin();
  }

}
