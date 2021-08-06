import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http' 
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { HomeComponent } from './components/home/home.component';
import { OperationsComponent } from './components/operations/operations.component';
import { APP_INITIALIZER } from '@angular/core';
import { AppsettingsService } from './service/appsettings.service';


import { requestInterceptor } from './interceptor/request.interceptor';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { OperationDetailsComponent } from './components/operation-details/operation-details.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    HomeComponent,
    OperationsComponent,
    SignUpComponent,
    OperationDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatDialogModule
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
