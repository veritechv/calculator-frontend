import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/service/services.service';
import { Service } from 'src/app/model/service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-service-dialog',
  templateUrl: './create-service-dialog.component.html',
  styleUrls: ['./create-service-dialog.component.css']
})
export class CreateServiceDialogComponent implements OnInit {
  serviceTypes: string[] = [];
  form: FormGroup;
  type: FormControl;
  name: FormControl;
  desc: FormControl;
  cost: FormControl;
  numParams: FormControl;
  saveMessage: string = null;
  wasSaveSuccessful: boolean = false;

  constructor(private dialogRef: MatDialogRef<CreateServiceDialogComponent>,
    private servicesService: ServicesService) { }

  ngOnInit(): void {
    //recover list of service types to populate control
    this.servicesService.serviceTypes().subscribe(data => {
      this.serviceTypes = data;
    });

    //create form controls
    this.createFormControls();
    this.createFormGroup();
  }

  public close() {
    this.dialogRef.close();
  }

  public save() {
    this.wasSaveSuccessful = false;//reset before to handle save-button status
    if (this.form.valid) {
      let newService = new Service();
      newService.type = this.type.value;
      newService.name = this.name.value;
      newService.description = this.desc.value;
      newService.cost = this.cost.value;
      newService.numParameters = this.numParams.value;

      this.servicesService.create(newService).subscribe(result => {
        this.saveMessage = 'Service registered successfully!'
        this.wasSaveSuccessful = true;
        this.form.reset();
      }, err => {
        this.saveMessage = err.error;
        this.wasSaveSuccessful = false;
      }
      );

    }
  }

  private createFormGroup(): void {
    this.form = new FormGroup({
      type: this.type,
      name: this.name,
      description: this.desc,
      cost: this.cost,
      numParams: this.numParams
    });
  }

  private createFormControls(): void {
    this.type = new FormControl('', [Validators.required]);
    this.name = new FormControl('', [Validators.required, Validators.minLength(3)]);
    this.desc = new FormControl('');
    this.cost = new FormControl(1, [Validators.required, Validators.pattern('[0-9]+')]);
    this.numParams = new FormControl(0, [Validators.required, Validators.pattern('[0-9]+')]);
  }

}
