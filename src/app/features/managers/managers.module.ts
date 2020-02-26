import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagersRoutingModule, ManagersRoutingComponents } from './managers-routing.module';
import { AddManagersComponent } from './add-managers/add-managers.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';


@NgModule({
  declarations: [ManagersRoutingComponents, AddManagersComponent],
  imports: [
    CommonModule,
    ManagersRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule
  ]
})
export class ManagersModule { }
