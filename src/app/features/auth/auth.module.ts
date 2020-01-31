import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule, AuthRoutingComponents } from './auth-routing.module';
import { SelectcompanyComponent } from './selectcompany/selectcompany.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [AuthRoutingComponents, SelectcompanyComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule
  ]
})
export class AuthModule { }
