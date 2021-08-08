import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog'; 
import { Service } from 'src/app/model/service';
import { ServicesService } from 'src/app/service/services.service';
import { ViewChild } from '@angular/core';


@Component({
  selector: 'app-service-details',
  templateUrl: './service-details-dialog.component.html',
  styleUrls: ['./service-details-dialog.component.css']
})
export class ServiceDetailsDialogComponent implements OnInit {
  service:Service = null;
  isEdit:boolean = false;
  isAdmin:boolean = false;
  isUpdateSuccessful:boolean = false;
  updateMessage:string = "";
  @ViewChild('f')form:any;

  constructor(@Inject(MAT_DIALOG_DATA) public data:any, private serviceServices:ServicesService) { }

  ngOnInit(): void {
    if(this.data!=null){
      this.service = <Service>this.data['service'];
      this.isEdit = <boolean>this.data['isEdit'];
      this.isAdmin = <boolean>this.data['isAdmin'];
    }
  }

  public submit():void{
    //reset flags with before every try
    this.isUpdateSuccessful = false;
    this.updateMessage = "";

    //if(this.form.valid){
      this.serviceServices.update(this.service).subscribe(result=>{
        this.isUpdateSuccessful = true;
        this.updateMessage = "Update successful!"
      }, err=>{
        this.isUpdateSuccessful = false;
        this.updateMessage = "Something ocurred with your request. Please verify your data and try again."
      });
    //}
    
  }

}
