import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavigationGuard } from './guards/navigation.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { OperationsComponent } from './operations/operations.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'login', component: LoginComponent},
  {path:'services', component: OperationsComponent, canActivate:[NavigationGuard]},
  {path:'signup', component: SignUpComponent},
  {path:'**', redirectTo: '', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
