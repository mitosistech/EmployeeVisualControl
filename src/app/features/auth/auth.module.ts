import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule, AuthRoutingComponents } from './auth-routing.module';
import { SelectcompanyComponent } from './selectcompany/selectcompany.component';
import { FormsModule } from '@angular/forms';
import { ToastrService, ToastrModule } from 'ngx-toastr';



@NgModule({
  declarations: [AuthRoutingComponents, SelectcompanyComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
  ]
})
export class AuthModule { }
