import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagersRoutingModule, ManagersRoutingComponents } from './managers-routing.module';
import { AddManagersComponent } from './add-managers/add-managers.component';



@NgModule({
  declarations: [ManagersRoutingComponents, AddManagersComponent],
  imports: [
    CommonModule,
    ManagersRoutingModule
  ]
})
export class ManagersModule { }
