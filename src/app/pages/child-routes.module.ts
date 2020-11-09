// ANGULAR
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

// GUARDS
import { AuthGuard } from '../guard/auth.guard';
import { AdminGuard } from '../guard/admin.guard';

// COMPONENTS
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ProgressComponent } from './progress/progress.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';

const childRoutes: Routes = [
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
  {
    path: 'buscar/:termino',
    component: BusquedaComponent,
    data: { title: 'Busquedas' },
  },

  // MANTENIMIENTOS:

  {
    path: 'hospitales',
    component: HospitalesComponent,
    data: { title: 'Mantenimiento de hospitales' },
  },
  {
    path: 'medicos',
    component: MedicosComponent,
    data: { title: 'Mantenimiento de medicos' },
  },
  {
    path: 'medico/:id',
    component: MedicoComponent,
    data: { title: 'Mantenimiento de medicos' },
  },

  // RUTAS DE ADMIN
  {
    path: 'usuarios',
    canActivate: [AdminGuard],
    component: UsuariosComponent,
    data: { title: 'Mantenimiento de usuarios' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule],
})
export class ChildRoutesModule {}
