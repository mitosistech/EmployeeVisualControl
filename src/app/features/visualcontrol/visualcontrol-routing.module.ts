import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ClientsComponent } from './clients/clients.component';
import { CollaboratorsComponent } from './collaborators/collaborators.component';
import { VisualcontrolComponent } from './visualcontrol.component';


const routes: Routes = [
  {
    path: '',
    component: VisualcontrolComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'home/:businessId', component: HomeComponent },
      { path: 'clients/:businessId/:stateCode', component: ClientsComponent },
      { path: 'collaborators/:customerId/:stateCode', component: CollaboratorsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VisualcontrolRoutingModule { }
export const VisualControlComponent = [HomeComponent, ClientsComponent, CollaboratorsComponent, VisualcontrolComponent];
