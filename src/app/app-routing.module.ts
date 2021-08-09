import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavigationGuard } from './guards/navigation.guard';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ServicesComponent } from './components/calculator-services/services.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { UsersComponent } from './components/users/users.component';
import { RecordsComponent } from './components/records/records.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'login', component: LoginComponent},
  {path:'services', component: ServicesComponent, canActivate:[NavigationGuard]},
  {path:'records', component: RecordsComponent, canActivate:[NavigationGuard]},
  {path:'users', component: UsersComponent, canActivate:[NavigationGuard]},
  {path:'signup', component: SignUpComponent},
  {path:'**', redirectTo: '', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
