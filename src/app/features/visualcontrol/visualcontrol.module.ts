import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VisualcontrolRoutingModule, VisualControlComponent } from './visualcontrol-routing.module';
import { VisualcontrolComponent } from './visualcontrol.component';
import { ManagerComponent } from './manager/manager.component';
import { AddmanagerComponent } from './addmanager/addmanager.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [VisualControlComponent, VisualcontrolComponent, ManagerComponent, AddmanagerComponent],
  imports: [
    CommonModule,
    VisualcontrolRoutingModule,
    FormsModule
  ]
})
export class VisualcontrolModule { }
