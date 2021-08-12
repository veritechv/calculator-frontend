import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Service } from 'src/app/model/service';
import { ServiceRequest } from 'src/app/model/service-request';
import { ServiceResponse } from 'src/app/model/service-response';
import { CalculatorService } from 'src/app/service/calculator.service';

@Component({
  selector: 'app-execute-service-dialog',
  templateUrl: './execute-service-dialog.component.html',
  styleUrls: ['./execute-service-dialog.component.css']
})
export class ExecuteServiceDialogComponent implements OnInit {
  serviceResponse:ServiceResponse = null;
  service:Service = null;
  username:string = null;
  formParameters:any[] = [];
  form: FormGroup;

  constructor(private dialogRef: MatDialogRef<ExecuteServiceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any, private calculatorService:CalculatorService, ) { }

  ngOnInit(): void {
    if(this.data!=null){
      this.service = <Service>this.data['service'];
      this.username = this.data['username'];
      this.initializeForm();
    }
  }

  private initializeForm(): void{
    let form = {};
    if(this.service.isFreeForm()){//only one paramter is needed
      let label = 'Parameter-1';
      this.formParameters[0] = label;
      form[label]=new FormControl('', [Validators.required]);
    }else{
      //build form controls
      for(let i=0;i<this.service.numParameters;i++){
        let label = 'Parameter-'+(i+1)
        this.formParameters[i] = label;
        form[label] = new FormControl('', [Validators.required, Validators.pattern('[0-9]+')]);
      }
    }
    this.form = new FormGroup(form);
  }

  public execute():void{
    //reset response
    this.serviceResponse = null;

    let serviceRequest = new ServiceRequest();
    serviceRequest.username = this.username;
    serviceRequest.serviceUuid = this.service.uuid;
    serviceRequest.parameters = [];
    
    this.formParameters.forEach(param=>{
      serviceRequest.parameters.push(this.form.controls[param].value);
    });

    this.calculatorService.execute(serviceRequest).subscribe(result=>{
      this.serviceResponse = result;
      this.form.reset();
    });
  }

  public close():void{
    this.dialogRef.close();
  }

}
