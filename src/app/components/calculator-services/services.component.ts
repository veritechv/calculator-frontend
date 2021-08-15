import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Service } from '../../model/service';
import { User } from '../../model/user';
import { ServicesService } from '../../service/services.service';
import { UserSessionService } from '../../service/user-session.service';
import { MatDialog } from '@angular/material/dialog';
import { ServiceDetailsDialogComponent } from '../service-details-dialog/service-details-dialog.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { InformationDialogComponent } from '../information-dialog/information-dialog.component';
import { CreateServiceDialogComponent } from '../create-service-dialog/create-service-dialog.component';
import { ExecuteServiceDialogComponent } from '../execute-service-dialog/execute-service-dialog.component';
import { PagingInfo } from 'src/app/model/paging-info';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  filterText: string;
  loggedUser: User = null;;
  isLogged: boolean;
  services: Service[] = [];
  displayedServices: Service[] = [];
  pagingInfo: PagingInfo = new PagingInfo(0, 10, 0, null);

  constructor(private servicesService: ServicesService,
    private userSessionService: UserSessionService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.isLogged = this.userSessionService.isLogged();
    if (this.isLogged) {
      this.loggedUser = this.userSessionService.getLoggedUser();
    }

    this.userSessionService.getLoggedUser$().subscribe(user => {
      this.loggedUser = user;
      this.isLogged = true;
    });

    this.loadList(this.pagingInfo.pageIndex, this.pagingInfo.pageSize, '');
  }

  public filter(keyEvent: any): void {
    if (this.filterText !== null && this.filterText !== '') {
      this.displayedServices = this.services.filter(service => {
        return service.name.toLowerCase().includes(this.filterText.toLowerCase());
      });
    } else {
      this.displayedServices = this.services;
    }
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

  private loadList(pageIndex: number, pageSize: number, sortingField: string): void {
    this.servicesService.services(pageIndex, pageSize, sortingField, this.loggedUser.isAdmin()).subscribe(
      data => {
        this.services = data['content'].map(item => {
          return new Service(item['uuid'], item['name'], item['description'],
            item['type'], item['status'], item['cost'], item['numParameters']);
        });
        //get paging information
        this.pagingInfo.length = data['totalElements'];
        this.pagingInfo.pageSize = data['pageable']['pageSize'];
        this.pagingInfo.pageIndex = data['pageable']['pageNumber'];

        this.displayedServices = this.services;

      },
      err => {
        console.log('something happened while retrieving you data')
      }
    );
  }

  public details(service: Service): void {
    let detailsDialog = this.dialog.open(ServiceDetailsDialogComponent, { 'data': { 'service': service, 'isEdit': false, 'isAdmin': this.isUserAdmin() } });
    detailsDialog.afterClosed().subscribe(result => {
      console.log(`this is the result ${result}`);
    });
  }

  public edit(service: Service): void {
    let detailsDialog = this.dialog.open(ServiceDetailsDialogComponent, { 'data': { 'service': service, 'isEdit': true, 'isAdmin': this.isUserAdmin() } });
    detailsDialog.afterClosed().subscribe(result => {
      if(result){
        this.loadList(0, this.pagingInfo.pageSize, '');//refresh list to remove deleted item
      }
    });
  }

  public new(): void {
    let createServiceDialog = this.dialog.open(CreateServiceDialogComponent);
    createServiceDialog.afterClosed().subscribe(result => {
      //if all went ok, then reload list
      this.loadList(0, this.pagingInfo.pageSize, '');
    });
  }

  public execute(service: Service): void {
    let executeDialog = this.dialog.open(ExecuteServiceDialogComponent, { data: { 'service': service, 'username': this.loggedUser.username } });
    executeDialog.afterClosed().subscribe(result => {
      console.log('service executed');

    }, err => {
      console.log(err);

    });
  }

  public isUserAdmin(): boolean {
    return this.loggedUser && this.loggedUser.isAdmin();
  }

  private checkIfUserIsLogged() {
    if (this.loggedUser == null) {
      this.dialog.open(InformationDialogComponent, { data: { 'message': 'Your session has expired please loging again.' } });
    }
  }

}
