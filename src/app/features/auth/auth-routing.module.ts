import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';


const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'forgotPassword', component: ForgetpasswordComponent},
  {path: 'resetPassword', component: ResetpasswordComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
export const AuthRoutingComponents = [LoginComponent, ForgetpasswordComponent, ResetpasswordComponent];
