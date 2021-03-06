import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http' 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { HomeComponent } from './components/home/home.component';
import { APP_INITIALIZER } from '@angular/core';
import { AppsettingsService } from './service/appsettings.service';


import { requestInterceptor } from './interceptor/request.interceptor';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ServicesComponent } from './components/calculator-services/services.component';
import { UsersComponent } from './components/users/users.component';
import { RecordsComponent } from './components/records/records.component';
import { ServiceDetailsDialogComponent } from './components/service-details-dialog/service-details-dialog.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { InformationDialogComponent } from './components/information-dialog/information-dialog.component';
import { CreateServiceDialogComponent } from './components/create-service-dialog/create-service-dialog.component';
import { ExecuteServiceDialogComponent } from './components/execute-service-dialog/execute-service-dialog.component';
import { UserDetailsDialogComponent } from './components/user-details-dialog/user-details-dialog.component';
import { RecordDetailsDialogComponent } from './components/record-details-dialog/record-details-dialog.component';
import { UserProfileDialogComponent } from './components/user-profile-dialog/user-profile-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    HomeComponent,
    ServicesComponent,
    RecordsComponent,
    SignUpComponent,
    ServiceDetailsDialogComponent,
    ConfirmationDialogComponent,
    InformationDialogComponent,
    CreateServiceDialogComponent,
    ExecuteServiceDialogComponent,
    UsersComponent,
    UserDetailsDialogComponent,
    RecordDetailsDialogComponent,
    UserProfileDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule
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
