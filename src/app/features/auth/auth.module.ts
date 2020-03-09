import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule, AuthRoutingComponents } from './auth-routing.module';
import { SelectcompanyComponent } from './selectcompany/selectcompany.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrService, ToastrModule } from 'ngx-toastr';



@NgModule({
  declarations: [AuthRoutingComponents, SelectcompanyComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,

    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
  ]
})
export class AuthModule { }
