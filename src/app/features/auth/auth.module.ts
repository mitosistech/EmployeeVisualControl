import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule, AuthRoutingComponents } from './auth-routing.module';
import { SelectcompanyComponent } from './selectcompany/selectcompany.component';



@NgModule({
  declarations: [AuthRoutingComponents, SelectcompanyComponent],
  imports: [
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
