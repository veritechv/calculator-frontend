import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Service } from 'src/app/model/service';
import { ServicesService } from 'src/app/service/services.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { InformationDialogComponent } from '../information-dialog/information-dialog.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-service-details',
  templateUrl: './service-details-dialog.component.html',
  styleUrls: ['./service-details-dialog.component.css']
})
export class ServiceDetailsDialogComponent implements OnInit {
  service: Service = null;
  isEdit: boolean = false;
  isAdmin: boolean = false;
  successMessage: string = null;
  errorMessage: string = null;
  form: FormGroup;
  name: FormControl;
  type: FormControl;
  desc: FormControl;
  cost: FormControl;
  status: FormControl;
  numParams: FormControl;
  types: string[] = []
  statuses: string[] = [];
  wasServiceDeleted = false;




  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<ServiceDetailsDialogComponent>,
    private serviceServices: ServicesService) { }

  ngOnInit(): void {
    if (this.data != null) {
      this.service = <Service>this.data['service'];
      this.isEdit = <boolean>this.data['isEdit'];
      this.isAdmin = <boolean>this.data['isAdmin'];
    }

    this.serviceServices.serviceTypes().subscribe(result => {
      this.types = result;
    });

    this.statuses = this.serviceServices.serviceStatusList();

    this.createFormControls();
    this.createFormGroup();
  }

  public update(): void {
    //reset flags with before every try
    this.successMessage = null;
    this.errorMessage = null;

    if (this.form.valid) {
      this.service.name = this.name.value;
      this.service.description = this.desc.value;
      this.service.type = this.type.value;
      this.service.status = this.status.value;
      this.service.numParameters = this.numParams.value;
      this.service.cost = this.cost.value;

      this.serviceServices.update(this.service).subscribe(result => {
        this.successMessage = "Update successful!"
        this.form.markAsPristine();
      }, err => {
        this.errorMessage = "Something ocurred with your request. Please verify your data and try again."
      });
    }
  }

  public delete(): void {
    let confirmationDialog = this.dialog.open(ConfirmationDialogComponent, { data: { 'question': 'Are you sure you want to delete this service?' } });
    confirmationDialog.afterClosed().subscribe(result => {
      if (result === "true") {
        this.serviceServices.delete(this.service).subscribe(
          deleteResult => {
            this.dialog.open(InformationDialogComponent, { data: { 'message': 'Service deleted successfully!' } });
            this.form.reset();
            this.wasServiceDeleted = true;
            this.close();
          },
          err => {
            this.dialog.open(InformationDialogComponent, {
              data: {
                'response':
                  'The service couldn\'t be deleted. Please try again.\nIf the problem persist please contact the Administrator.'
              }
            });
          });
      }
    });
  }

  public close() {
    this.dialogRef.close(this.wasServiceDeleted);
  }


  private createFormGroup(): void {
    this.form = new FormGroup({
      name: this.name,
      desc: this.desc,
      type: this.type,
      status: this.status,
      cost: this.cost,
      numParams: this.numParams
    });
  }

  private createFormControls(): void {
    this.name = new FormControl(this.service.name, [Validators.required]);
    this.desc = new FormControl(this.service.description);
    this.type = new FormControl(this.service.type, [Validators.required]);
    this.status = new FormControl(this.service.status, [Validators.required]);
    this.cost = new FormControl(this.service.cost, [Validators.required, Validators.pattern('[0-9]+')]);
    this.numParams = new FormControl(this.service.numParameters, [Validators.required, Validators.pattern('[0-9]+')]);

  }

}
