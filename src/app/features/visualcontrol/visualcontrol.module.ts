import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VisualcontrolRoutingModule, VisualControlComponent } from './visualcontrol-routing.module';
import { VisualcontrolComponent } from './visualcontrol.component';
import { ManagerComponent } from './manager/manager.component';
import { AddmanagerComponent } from './addmanager/addmanager.component';

@NgModule({
  declarations: [VisualControlComponent, VisualcontrolComponent, ManagerComponent, AddmanagerComponent],
  imports: [
    CommonModule,
    VisualcontrolRoutingModule
  ]
})
export class VisualcontrolModule { }
