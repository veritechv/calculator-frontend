import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { APP_INITIALIZER } from '@angular/core';
import { AppsettingsService } from './service/appsettings.service';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { OperationsComponent } from './operations/operations.component';

import { HttpClientModule } from '@angular/common/http' 
import { requestInterceptor } from './interceptor/request.interceptor';
import { SignUpComponent } from './sign-up/sign-up.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    HomeComponent,
    OperationsComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule
  ],
  providers: [requestInterceptor,
    {
      provide: APP_INITIALIZER,
      multi:true,
      deps:[AppsettingsService],
      useFactory: (appSettingsService:AppsettingsService)=>{
        return()=>{return appSettingsService.loadSettings();};
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
