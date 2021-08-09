import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { PagingInfo } from 'src/app/model/paging-info';
import { User } from 'src/app/model/user';
import { UserSessionService } from 'src/app/service/user-session.service';
import { UsersService } from 'src/app/service/users.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { InformationDialogComponent } from '../information-dialog/information-dialog.component';
import { UserDetailsDialogComponent } from '../user-details-dialog/user-details-dialog.component';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  filterText: string;
  loggedUser: User = null;;
  isLogged: boolean;
  users: User[] = [];
  displayedUsers: User[] = []; //this helps as a temporary list when doing filtering
  pagingInfo: PagingInfo = new PagingInfo(0, 10, 0, null);

  constructor(private usersService: UsersService,
    private userSessionService: UserSessionService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    //I need to do this every time a reload the page
    this.isLogged = this.userSessionService.isLogged();
    if (this.isLogged) {
      this.loggedUser = this.userSessionService.getLoggedUser();
    }

    //this is called everytime we log in, so after a page change I
    //need to do the above
    this.userSessionService.getLoggedUser$().subscribe(user => {
      this.loggedUser = user;
      this.isLogged = true;
    });

    this.loadList(this.pagingInfo.pageIndex, this.pagingInfo.pageSize, '');
  }

  private loadList(pageIndex: number, pageSize: number, sortingField: string): void {
    this.usersService.users(pageIndex, pageSize, sortingField).subscribe(
      data => {
        this.users = data['content'].map(item => {
          return new User(item['username'],item['uuid'], item['roles'],
            item['status'], item['balance']);
        });
        //get paging information
        this.pagingInfo.length = data['totalElements'];
        this.pagingInfo.pageSize = data['pageable']['pageSize'];
        this.pagingInfo.pageIndex = data['pageable']['pageNumber'];
        //after every reload I need to reset the displayedUsers.
        this.displayedUsers = this.users;

      },
      err => {
        console.log('something happened while retrieving you data')
      }
    );
  }

  public details(user: User): void {
    this.dialog.open(UserDetailsDialogComponent, { 'data': { 'user': user, 'isEdit': false} });
  }

  public edit(user: User): void {
    this.dialog.open(UserDetailsDialogComponent, { 'data': { 'user': user, 'isEdit': true} });    
  }

  public delete(user: User): void {
    let confirmationDialog = this.dialog.open(ConfirmationDialogComponent, { data: { 'question': 'Are you sure you want to delete this service?' } });
    confirmationDialog.afterClosed().subscribe(result => {
      if (result === "true") {
        this.usersService.delete(user).subscribe(deleteResult => {
          let informationDialog = this.dialog.open(InformationDialogComponent, { data: { 'message': 'User deleted successfully!' } });
          this.loadList(0, this.pagingInfo.pageSize, '');
        }, err => {
          let informationDialog = this.dialog.open(InformationDialogComponent, {
            data: {
              'message':
                'The user couldn\'t be deleted. Please try again.\nIf the problem persist please contact the Administrator.'
            }
          });
        });
      }
    });
  }

  /*
   * This function is called by the paginator to get the next batch of results
   */
  public fetch(event: PageEvent): PageEvent {
    this.loadList(event.pageIndex, event.pageSize, '');
    return event;
  }

  /*
  Sorting will reload again the list starting from zero.
*/
  public sort(sortField: string): void {
    this.loadList(0, this.pagingInfo.pageSize, sortField);
  }

  /*
   * Every time we type something into the filter box we update the displayed users list
   */
  public filter(keyEvent: any): void {
    if (this.filterText !== null && this.filterText !== '') {
      this.displayedUsers = this.users.filter(user => {
        return user.username.toLowerCase().includes(this.filterText.toLowerCase());
      });
    } else {
      this.displayedUsers = this.users;
    }
  }

  //this helps to show/hide admin specific actions
  public isUserAdmin(): boolean {
    return this.loggedUser && this.loggedUser.isAdmin();
  }


}
