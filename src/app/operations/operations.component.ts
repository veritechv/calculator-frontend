import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Service } from '../model/service';
import { User } from '../model/user';
import { ServicesService } from '../service/services.service';
import { UserSessionService } from '../service/user-session.service';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.css']
})
export class OperationsComponent implements OnInit {
  loggedUser:User | null = null;;
  isLogged:boolean;
  services:Service[] = [];

  constructor(private servicesService:ServicesService, private userSessionService:UserSessionService) { }

  ngOnInit(): void {
    this.isLogged = this.userSessionService.isLogged();
    if(this.isLogged){
      this.loggedUser = this.userSessionService.getLoggedUser();
    }

    this.userSessionService.getLoggedUser$().subscribe(user=>{
      this.loggedUser = user;
      this.isLogged = true;
    });

    this.servicesService.services().subscribe(
      data=>{
        this.services = data['content'].map(item=>{
          return new Service(item['uuid'],item['name'], item['status'], item['cost'] );
        });
        
      },
      err=>{
        console.log('something happened while retrieving you data')
      }
    );
  }

}
