import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  errorMessage:string;
  successMessage:string;

  constructor(private router:Router, private loginService:LoginService) { }

  ngOnInit(): void {
  }

  public signUp(username, password, passwordCheck){
    if(username && password && password && (password === passwordCheck)){
      console.log('all good so far');
      this.loginService.signUp(username, password).subscribe(result=>{       
          this.successMessage=result['response'];
          this.errorMessage = null;
      },
      err=>{
        this.errorMessage = err.error;
        this.successMessage = null;
      });
      
      
    }else{      
      this.errorMessage= "Some information is missing, please check.";
    }
  }
  public successfulSignUp():boolean{
    return this.successMessage != null;
  }

  public errorHappened():boolean{
    return this.errorHappened != null;
  }


}
  


