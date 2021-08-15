import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/model/user';
import { UsersService } from 'src/app/service/users.service';

@Component({
  selector: 'app-user-details-dialog',
  templateUrl: './user-details-dialog.component.html',
  styleUrls: ['./user-details-dialog.component.css']
})
export class UserDetailsDialogComponent implements OnInit {
  user: User;
  isEdit: boolean;
  roles: string[] = [];
  statuses: string[] = [];
  form: FormGroup;
  role: FormControl;
  status: FormControl;
  balance: FormControl;
  saveMessage: string = null;
  wasSaveSuccessful: boolean = false;


  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<UserDetailsDialogComponent>,
    private usersService: UsersService) { }

  ngOnInit(): void {

    this.usersService.userRolesList().subscribe(result => {
      this.roles = result;
    });

    this.usersService.userStatusesList().subscribe(result => {
      this.statuses = result;
    });

    if (this.data != null) {
      this.user = this.data['user']
      this.isEdit = this.data['isEdit'];
    }

    //create form controls
    this.createFormControls();
    this.createFormGroup();
  }

  public update() {
    //update user's attributes from those in the form controls
    this.user.balance = this.balance.value;
    this.user.roles = [this.role.value];
    this.user.status = this.status.value;

    this.usersService.update(this.user).subscribe(result => {
      this.saveMessage = 'User updated successfully!'
      this.wasSaveSuccessful = true;
      this.form.markAsPristine();
    }, err => {
      this.saveMessage = err.error;
      this.wasSaveSuccessful = false;
    }
    );
  }

  public close() {
    this.dialogRef.close();
  }

  private createFormGroup(): void {
    this.form = new FormGroup({
      role: this.role,
      status: this.status,
      balance: this.balance
    });
  }

  private createFormControls(): void {
    this.role = new FormControl(this.user.roles[0], [Validators.required]);
    this.status = new FormControl(this.user.status, [Validators.required, Validators.minLength(3)]);
    this.balance = new FormControl(this.user.balance, [Validators.required, Validators.pattern('[0-9]+')]);
  }
}
