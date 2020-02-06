import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagersComponent } from './managers.component';
import { ManagerListComponent } from './manager-list/manager-list.component';
import { AddManagersComponent } from './add-managers/add-managers.component';


const routes: Routes = [
  {
    path: '',
    component: ManagersComponent,
    children: [
      {path: '', component:ManagerListComponent},
      {path: 'lists', component:ManagerListComponent},
      {path: 'add', component:AddManagersComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagersRoutingModule { }
export const ManagersRoutingComponents = [ManagersComponent, ManagerListComponent, AddManagersComponent]
