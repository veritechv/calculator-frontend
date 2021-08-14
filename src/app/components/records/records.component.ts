import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { PagingInfo } from 'src/app/model/paging-info';
import { Record } from 'src/app/model/record';
import { User } from 'src/app/model/user';
import { RecordsService } from 'src/app/service/records.service';
import { UserSessionService } from 'src/app/service/user-session.service';
import { RecordDetailsDialogComponent } from '../record-details-dialog/record-details-dialog.component';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})
export class RecordsComponent implements OnInit {
  filterText: string;
  loggedUser: User = null;;
  isLogged: boolean;
  records: Record[] = [];
  displayedRecords: Record[] = []; //this helps as a temporary list when doing filtering
  pagingInfo: PagingInfo = new PagingInfo(0, 10, 0, null);

  constructor(private recordsService:RecordsService,
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
    this.recordsService.records(pageIndex, pageSize, sortingField, this.loggedUser.username, this.loggedUser.isAdmin()).subscribe(
      data => {
        this.records = data['content'].map(item => {
          return new Record(item['uuid'], item['serviceName'], item['serviceType'],
            item['username'], item['cost'], item['balance'],
            item['response'], item['date'], item['status']);
        });
        //get paging information
        this.pagingInfo.length = data['totalElements'];
        this.pagingInfo.pageSize = data['pageable']['pageSize'];
        this.pagingInfo.pageIndex = data['pageable']['pageNumber'];
        //after every reload I need to reset the displayedUsers.
        this.displayedRecords = this.records;

      },
      err => {
        console.log('something happened while retrieving you data')
      }
    );
  }

  public details(record:Record):void{
    this.dialog.open(RecordDetailsDialogComponent, { 'data': { 'record': record, 'isEdit': false} });
  }

  public edit(record:Record):void{
    this.dialog.open(RecordDetailsDialogComponent, { 'data': { 'record': record, 'isEdit': true} });
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
      this.displayedRecords = this.records.filter(record => {
        return record.serviceType.toLowerCase().includes(this.filterText.toLowerCase());
      });
    } else {
      this.displayedRecords = this.records;
    }
  }

  //this helps to show/hide admin specific actions
  public isUserAdmin(): boolean {
    return this.loggedUser && this.loggedUser.isAdmin();
  }


}
