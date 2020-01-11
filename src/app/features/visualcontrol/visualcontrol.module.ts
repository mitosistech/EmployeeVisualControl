import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VisualcontrolRoutingModule, VisualControlComponent } from './visualcontrol-routing.module';
import { VisualcontrolComponent } from './visualcontrol.component';

@NgModule({
  declarations: [VisualControlComponent, VisualcontrolComponent],
  imports: [
    CommonModule,
    VisualcontrolRoutingModule
  ]
})
export class VisualcontrolModule { }
