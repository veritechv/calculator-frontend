import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../service/login.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  form: FormGroup;
  email: FormControl;
  password: FormControl;
  passwordVerify: FormControl;

  errorMessage: string;
  successMessage: string;

  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
    this.createFormControls();
    this.createFormGroup();
  }

  public signUp() {
    //reset messages before every attempt
    this.errorMessage = null;
    this.successMessage = null;

    if (this.form.valid) {

      if (this.password.value !== this.passwordVerify.value) {
        this.errorMessage = "Passwords don't match. Please Verify."
        return;
      }

      console.log('all good so far');
      this.loginService.signUp(this.email.value, this.password.value).subscribe(result => {
        this.successMessage = result['response'];
        this.errorMessage = null;
        this.form.reset();
      },
        err => {
          this.errorMessage = err.error['response'] || err.error;
          this.successMessage = null;
        });


    } else {
      this.errorMessage = 'Some information is missing, please check.';
    }
  }


  private createFormGroup(): void {
    this.form = new FormGroup({
      email: this.email,
      password: this.password,
      passwordVerify: this.passwordVerify
    });
  }

  private createFormControls(): void {
    this.email = new FormControl('', [Validators.email, Validators.required]);
    this.password = new FormControl('', [Validators.required]);
    this.passwordVerify = new FormControl('', [Validators.required]);
  }

}



