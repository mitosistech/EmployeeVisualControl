import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule, AuthRoutingComponents } from './auth-routing.module';



@NgModule({
  declarations: [AuthRoutingComponents],
  imports: [
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
