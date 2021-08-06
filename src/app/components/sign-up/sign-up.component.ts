import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../service/login.service';
import {FormsModule, FormGroup, FormControl} from '@angular/forms';
import { ViewChild } from '@angular/core';


class SignupInfo {
  constructor(public username:string = '',
              public password:string = '',
              public passwordCheck:string='') {
  }
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  model:SignupInfo = new SignupInfo();
  @ViewChild('f')form:any;

  errorMessage:string;
  successMessage:string;

  constructor(private router:Router, private loginService:LoginService) { }

  ngOnInit(): void {
  }

  public signUp(){
    if(this.form.valid){

      if(this.model.password !== this.model.passwordCheck){
        this.errorMessage = "Passwords don't match. Please Verify."
        return;
      }

      console.log('all good so far');
      this.loginService.signUp(this.model.username, this.model.password).subscribe(result=>{       
          this.successMessage=result['response'];
          this.errorMessage = null;
          this.form.reset();
      },
      err=>{
        this.errorMessage = err.error['response'] || err.error;
        this.successMessage = null;
      });
      
      
    }else{      
      this.errorMessage= 'Some information is missing, please check.';
    }
  }
  public successfulSignUp():boolean{
    return this.successMessage != null;
  }

  public errorHappened():boolean{
    return this.errorHappened != null;
  }


}
  


