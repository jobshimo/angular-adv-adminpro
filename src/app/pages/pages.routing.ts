import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { PerfilComponent } from './perfil/perfil.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { AuthGuard } from '../guard/auth.guard';

const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent, data: { title: 'Dashboard' } },
      {
        path: 'progress',
        component: ProgressComponent,
        data: { title: 'ProgressBar' },
      },
      {
        path: 'grafica1',
        component: Grafica1Component,
        data: { title: 'Grafica #1' },
      },
      {
        path: 'account-settings',
        component: AccountSettingsComponent,
        data: { title: 'Account Settings' },
      },
      {
        path: 'promesas',
        component: PromesasComponent,
        data: { title: 'Promesas' },
      },
      { path: 'rxjs', component: RxjsComponent, data: { title: 'Rxjs' } },
      {
        path: 'perfil',
        component: PerfilComponent,
        data: { title: 'Perfil de Usuario' },
      },

      // MANTENIMIENTOS:
      {
        path: 'usuarios',
        component: UsuariosComponent,
        data: { title: 'Usuario de aplicación' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
