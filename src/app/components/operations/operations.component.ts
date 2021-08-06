import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Service } from '../../model/service';
import { User } from '../../model/user';
import { ServicesService } from '../../service/services.service';
import { UserSessionService } from '../../service/user-session.service';
import { MatDialog } from '@angular/material/dialog';
import { OperationDetailsComponent } from '../operation-details/operation-details.component';

class PagingInfo
{
  constructor(public length:number = 0, 
    public pageSize:number = 0, 
    public pageIndex:number = 0, 
    public pageEvent: PageEvent = null){}
}


@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.css']
})
export class OperationsComponent implements OnInit {
  filterText:string;
  loggedUser:User | null = null;;
  isLogged:boolean;
  services:Service[] = [];
  displayedServices:Service[] = [];
  pagingInfo:PagingInfo = new PagingInfo(0,2,0,null);

  constructor(private servicesService:ServicesService, 
    private userSessionService:UserSessionService, 
    private dialog:MatDialog) { }

  ngOnInit(): void {
    this.isLogged = this.userSessionService.isLogged();
    if(this.isLogged){
      this.loggedUser = this.userSessionService.getLoggedUser();
    }

    this.userSessionService.getLoggedUser$().subscribe(user=>{
      this.loggedUser = user;
      this.isLogged = true;
    });

    this.loadList(this.pagingInfo.pageIndex, this.pagingInfo.pageSize, '' );
  }

  public filter(keyEvent:any):void{
    if(this.filterText!== null && this.filterText!==''){
      this.displayedServices = this.services.filter(service=>{
        return service.name.toLowerCase().includes(this.filterText.toLowerCase());
      });
    }else{
      this.displayedServices = this.services;
    }
  }

  public fetch(event:PageEvent):PageEvent{
    this.loadList(event.pageIndex, event.pageSize, '');
    return event;
  }

  /*
    Sorting will reload again the list starting from zero.
  */
  public sort(sortField:string):void{
    this.loadList(0, this.pagingInfo.pageSize, sortField);
  }

  public showDetails(service:Service):void{
    let detailsDialog = this.dialog.open(OperationDetailsComponent, {'data':{'service':service}});
    detailsDialog.afterClosed().subscribe(result=>{
      console.log(`this is the result ${result}`);      
    });
  }

  private loadList(pageIndex:number, pageSize:number, sortingField:string):void{
    this.servicesService.services(pageIndex, pageSize, sortingField).subscribe(
      data=>{
        this.services = data['content'].map(item=>{
          return new Service(item['uuid'],item['name'], item['status'], item['cost'] );
        });
      //get paging information
      this.pagingInfo.length = data['totalElements'];
      this.pagingInfo.pageSize = data['pageable']['pageSize'];
      this.pagingInfo.pageIndex = data['pageable']['pageNumber'];

        this.displayedServices = this.services;
        
      },
      err=>{
        console.log('something happened while retrieving you data')
      }
    );
  }

}
