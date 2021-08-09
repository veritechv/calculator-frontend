import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Record } from 'src/app/model/record';
import { User } from 'src/app/model/user';
import { RecordsService } from 'src/app/service/records.service';

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

}
