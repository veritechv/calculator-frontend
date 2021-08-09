import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Record } from 'src/app/model/record';
import { RecordsService } from 'src/app/service/records.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { InformationDialogComponent } from '../information-dialog/information-dialog.component';

@Component({
  selector: 'app-record-details-dialog',
  templateUrl: './record-details-dialog.component.html',
  styleUrls: ['./record-details-dialog.component.css']
})
export class RecordDetailsDialogComponent implements OnInit {
  record:Record;
  isEdit:boolean;
  form: FormGroup;
  cost: FormControl;
  response: FormControl;
  balance: FormControl;
  saveMessage: string = null;
  wasSaveSuccessful: boolean = false;


  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<RecordDetailsDialogComponent>,
    private recordsService:RecordsService) { }

  ngOnInit(): void {

    if (this.data != null) {
      this.record = this.data['record']
      this.isEdit = this.data['isEdit'];
    }

    //create form controls
    this.createFormControls();
    this.createFormGroup();

  }

  private createFormGroup(): void {
    this.form = new FormGroup({
      cost: this.cost,
      response: this.response,
      balance: this.balance
    });
  }

  private createFormControls(): void {
    this.cost = new FormControl(this.record.cost, [Validators.required, Validators.pattern('[0-9]+')]);
    this.response = new FormControl(this.record.response, [Validators.required, Validators.pattern('[0-9]+')]);
    this.balance = new FormControl(this.record.date, [Validators.required, Validators.pattern('[0-9]+')]);
  }

  public update() {
    //update user's attributes from those in the form controls
    this.record.balance = this.balance.value;
    this.record.cost = this.cost.value;
    this.record.response = this.response.value;

    this.recordsService.update(this.record).subscribe(result => {
      this.saveMessage = 'User updated successfully!'
      this.wasSaveSuccessful = true;
    }, err => {
      this.saveMessage = err.error;
      this.wasSaveSuccessful = false;
    }
    );
  }

  public close() {
    this.dialogRef.close();
  }

  public delete(): void {
    let confirmationDialog = this.dialog.open(ConfirmationDialogComponent, { data: { 'question': 'Are you sure you want to delete this record?' } });
    confirmationDialog.afterClosed().subscribe(result => {
      if (result === "true") {
        this.recordsService.delete(this.record.uuid).subscribe(
          deleteResult => {
            this.dialog.open(InformationDialogComponent, { data: { 'message': 'Service deleted successfully!' } });
            this.form.reset();
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

}
