import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminGuard } from '../guards/admin.guard';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { PerfilComponent } from './perfil/perfil.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ProgressComponent } from '../pages/progress/progress.component';
import { Grafica1Component } from '../pages/grafica1/grafica1.component';
import { PromiseComponent } from './promise/promise.component';
import { RxJsComponent } from './rxjs/rxjs.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { UsuariosComponent } from './mantenimiento/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimiento/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimiento/medicos/medicos.component';
import { MedicoComponent } from './mantenimiento/medicos/medico.component';

const childRoutes: Routes = [
  { path: '', component: DashboardComponent, data: { title: 'Principal' } },
  { path: 'buscar/:txtBusqueda', component: BusquedaComponent, data: { title: 'Búsqueda General' } },
  { path: 'perfil', component: PerfilComponent, data: { title: 'Perfil de Usuario' } },
  { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Ajustes de Cuenta' } },
  { path: 'progress', component: ProgressComponent, data: { title: 'ProgressBar' } },
  { path: 'grafica1', component: Grafica1Component, data: { title: 'Gráfica #1' } },
  { path: 'promise', component: PromiseComponent, data: { title: 'Promesas' } },
  { path: 'rxjs', component: RxJsComponent, data: { title: 'RxJs' } },
  // Mantenimiento
  { path: 'usuarios', canActivate: [AdminGuard], component: UsuariosComponent, data: { title: 'Usuarios' } },
  { path: 'hospitales', component: HospitalesComponent, data: { title: 'Hospitales' } },
  { path: 'medicos', component: MedicosComponent, data: { title: 'Médicos' } },
  { path: 'medico/:id', component: MedicoComponent, data: { title: 'Médico' } },
];

@NgModule({
  imports: [ RouterModule.forChild(childRoutes) ],
  exports: [ RouterModule ]
})
export class ChildRoutesModule { }
