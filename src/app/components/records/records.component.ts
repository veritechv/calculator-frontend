import { Component, OnInit } from '@angular/core';
import { Record } from 'src/app/model/record';
import { User } from 'src/app/model/user';
import { RecordsService } from 'src/app/service/records.service';
import { ServicesService } from 'src/app/service/services.service';
import { UserSessionService } from 'src/app/service/user-session.service';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})
export class RecordsComponent implements OnInit {
  loggedUser:User | null = null;;
  isLogged:boolean;
  records:Record[] = [];

  constructor(private recordsService:RecordsService, private userSessionService:UserSessionService) { }

  ngOnInit(): void {
    this.isLogged = this.userSessionService.isLogged();
    if(this.isLogged){
      this.loggedUser = this.userSessionService.getLoggedUser();
      if(this.loggedUser.isAdmin()){
      this.recordsService.records().subscribe(
        data=>{
          this.updateRecordList(data);
        },
        err=>{
         this.handleError(err);
        }
      );
      }else{
        this.recordsService.userRecords(this.loggedUser.username)).subscribe(
          data=>{
            this.updateRecordList(data);
          },
          err=>{
           this.handleError(err);
          }
        );
      }
    }

    this.userSessionService.getLoggedUser$().subscribe(user=>{
      this.loggedUser = user;
      this.isLogged = true;
    });

  }

  private updateRecordList(serviceData:any){
    if(serviceData && serviceData['content']){
      this.records = data['content'].map(item=>{
        return new Record(item['uuid'],item['service'], item['username'], 
        item['cost'], item['balance'], item['response'], item['date'] );
      });
    }else{
      console.error('Data from service is null or doesnt have the expected format');
      
    }
  }

  private handleError(err:any):void{
    console.log('something happened while retrieving you data');
  }

}
