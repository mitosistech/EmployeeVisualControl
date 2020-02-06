import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/auth/auth.module').then(mod => mod.AuthModule)
  },
  {
    path: 'vc',
    loadChildren: () => import('./features/visualcontrol/visualcontrol.module').then(mod => mod.VisualcontrolModule)
  },
  {
    path: 'managers',
    loadChildren: () => import('./features/managers/managers.module').then(mod => mod.ManagersModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
