import { Routes } from '@angular/router';
// Components
import { HomeComponent } from './layout/home/home.component';
import { NotfoundComponent } from './layout/notfound/notfound.component';
import { EntrarComponent } from './layout/entrar/entrar.component';
import { RegistrarseComponent } from './layout/registrarse/registrarse.component';
import { VerificacionComponent } from './layout/verificacion/verificacion.component';
import { ReenvioVerificacionComponent } from './layout/reenvio-verificacion/reenvio-verificacion.component';
// CRUD
import { CamaFormComponent } from './layout/crud_layouts/cama-form/cama-form.component';
import { CamaListComponent } from './layout/crud_layouts/cama-list/cama-list.component';
import { DiagnosticoFormComponent } from './layout/crud_layouts/diagnostico-form/diagnostico-form.component';
import { DiagnosticoListComponent } from './layout/crud_layouts/diagnostico-list/diagnostico-list.component';
import { AreaFormComponent } from './layout/crud_layouts/area-form/area-form.component';
import { AreaListComponent } from './layout/crud_layouts/area-list/area-list.component';
import { HistorialFormComponent } from './layout/crud_layouts/historial-form/historial-form.component';
import { HistorialListComponent } from './layout/crud_layouts/historial-list/historial-list.component';
import { EstudioFormComponent } from './layout/crud_layouts/estudio-form/estudio-form.component';
import { EstudioListComponent } from './layout/crud_layouts/estudio-list/estudio-list.component';
import { TiposPersonalFormComponent } from './layout/crud_layouts/tipos-personal-form/tipos-personal-form.component';
import { TiposPersonalListComponent } from './layout/crud_layouts/tipos-personal-list/tipos-personal-list.component';
import { TiposDeEstudioFormComponent } from './layout/crud_layouts/tipos-de-estudio-form/tipos-de-estudio-form.component';
import { TiposDeEstudioListComponent } from './layout/crud_layouts/tipos-de-estudio-list/tipos-de-estudio-list.component';
import { LogListComponent } from './layout/crud_layouts/log-list/log-list.component';
// Guards
import { AuthGuard } from './guard/auth.guard';
import { NoAuthGuard } from './guard/no-auth.guard';
import { AdminGuard } from './guard/admin.guard';
import { ExitGuard } from './guard/exit.guard';

// ??????????
import { PerfilComponent } from './layout/perfil/perfil.component';
import { IngresosComponent } from './layout/crud_layouts/ingresos/ingresos.component';
// Hijos

import { ModificarExistenteComponent } from './layout/miniform/modificar-existente/modificar-existente.component';
import { NuevoIngresoComponent } from './layout/miniform/nuevo-ingreso/nuevo-ingreso.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full',
  },
  {
    path: 'inicio',
    component: HomeComponent,
    title: 'Grey-Sloan Memorial Hospital',
  },
  {
    path: 'entrar',
    component: EntrarComponent,
    title: 'Entrar',
    canActivate: [NoAuthGuard], // Solo accesible si no estás conectado
    canDeactivate: [ExitGuard],
  },
  {
    path: 'registrarse',
    component: RegistrarseComponent,
    title: 'Registrarse',
    canActivate: [NoAuthGuard], // Solo accesible si no estás conectado
    canDeactivate: [ExitGuard],
  },
  { path: 'verificacion', 
    component: VerificacionComponent,
    title: 'Verificación',
    canActivate: [NoAuthGuard] // Solo accesible si no estás conectado
  },
  { path: 'reenvio-verificacion', 
    component: ReenvioVerificacionComponent,
    title: 'Reenvio Verificación',
    canActivate: [NoAuthGuard] // Solo accesible si no estás conectado
  },
  // --------------------------------------------------------------------
  {
    path: 'camas',
    component: CamaListComponent,
    title: 'Camas',
    canActivate: [AuthGuard]
  },
  {
    path: 'camas/crear',
    component: CamaFormComponent,
    title: 'Camas Crear',
    canActivate: [AdminGuard], // Solo accesible si eres administrador
    canDeactivate: [ExitGuard],
  },
  {
    path: 'camas/editar/:id',
    component: CamaFormComponent,
    title: 'Camas Editar',
    canActivate: [AdminGuard], // Solo accesible si eres administrador
    canDeactivate: [ExitGuard],
  },
  // --------------------------------------------------------------------
  {
    path: 'diagnosticos',
    component: DiagnosticoListComponent,
    title: 'Diagnósticos',
    canActivate: [AuthGuard]
  },
  {
    path: 'diagnosticos/crear',
    component: DiagnosticoFormComponent,
    title: 'Diagnósticos Crear',
    canActivate: [AdminGuard], // Solo accesible si eres administrador
    canDeactivate: [ExitGuard],
  },
  {
    path: 'diagnosticos/editar/:id',
    component: DiagnosticoFormComponent,
    title: 'Diagnósticos Editar',
    canActivate: [AdminGuard], // Solo accesible si eres administrador
    canDeactivate: [ExitGuard],
  },
  // --------------------------------------------------------------------
  {
    path: 'areas',
    component: AreaListComponent,
    title: 'Áreas',
    canActivate: [AuthGuard]
  },
  {
    path: 'areas/crear',
    component: AreaFormComponent,
    title: 'Áreas Crear',
    canActivate: [AdminGuard], // Solo accesible si eres administrador
    canDeactivate: [ExitGuard],
  },
  {
    path: 'areas/editar/:id',
    component: AreaFormComponent,
    title: 'Áreas Editar',
    canActivate: [AdminGuard], // Solo accesible si eres administrador
    canDeactivate: [ExitGuard],
  },
  // --------------------------------------------------------------------
  {
    path: 'historial',
    component: HistorialListComponent,
    title: 'Historial',
    canActivate: [AuthGuard]
  },
  {
    path: 'historial/crear',
    component: HistorialFormComponent,
    title: 'Historial Crear',
    canActivate: [AdminGuard], // Solo accesible si eres administrador
    canDeactivate: [ExitGuard],
  },
  {
    path: 'historial/editar/:id',
    component: HistorialFormComponent,
    title: 'Historial Editar',
    canActivate: [AdminGuard], // Solo accesible si eres administrador
    canDeactivate: [ExitGuard],
  },
  // --------------------------------------------------------------------
  {
    path: 'estudios',
    component: EstudioListComponent,
    title: 'Estudios',
    canActivate: [AuthGuard]
  },
  {
    path: 'estudios/crear',
    component: EstudioFormComponent,
    title: 'Estudios Crear',
    canActivate: [AdminGuard], // Solo accesible si eres administrador
    canDeactivate: [ExitGuard],
  },
  {
    path: 'estudios/editar/:id',
    component: EstudioFormComponent,
    title: 'Estudios Editar',
    canActivate: [AdminGuard], // Solo accesible si eres administrador
    canDeactivate: [ExitGuard],
  },
  // --------------------------------------------------------------------
  {
    path: 'tipos-personal',
    component: TiposPersonalListComponent,
    title: 'Tipos de Personal',
    canActivate: [AuthGuard]
},
{
    path: 'tipos-personal/crear',
    component: TiposPersonalFormComponent,
    title: 'Tipos de Personal Crear',
    canActivate: [AdminGuard],
    canDeactivate: [ExitGuard],
},
{
    path: 'tipos-personal/editar/:id',
    component: TiposPersonalFormComponent,
    title: 'Tipos de Personal Editar',
    canActivate: [AdminGuard],
    canDeactivate: [ExitGuard],
},
  // ----------------------------------------------------------------------
  {
    path: 'tipos-de-estudio',
    component: TiposDeEstudioListComponent,
    title: 'Tipos de Estudio',
    canActivate: [AuthGuard]
  },
  {
    path: 'tipos-de-estudio/crear',
    component: TiposDeEstudioFormComponent,
    title: 'Tipos de Estudio Crear',
    canActivate: [AdminGuard], // Solo accesible si eres administrador
    canDeactivate: [ExitGuard],
  },
  {
    path: 'tipos-de-estudio/editar/:id',
    component: TiposDeEstudioFormComponent,
    title: 'Tipos de Estudio Editar',
    canActivate: [AdminGuard], // Solo accesible si eres administrador
    canDeactivate: [ExitGuard],
  },
  // --------------------------------------------------------------------
  {
    path: 'logs',
    component: LogListComponent,
    title: 'Logs',
    canActivate: [AdminGuard]
  },
  // -------------------------------------------------------------------- ???????????????????
  {
    path: 'perfil',
    component: PerfilComponent,
    title: 'Perfil',
    canActivate: [AuthGuard], // Solo accesible si estás conectado
    canDeactivate: [ExitGuard]
  },
  {
    path: 'ingresos',
    component: IngresosComponent,
    title: 'Ingresos',
    canActivate: [AuthGuard], // Solo accesible si estás conectado
    children: [
      { path: 'nuevo-ingreso', component: NuevoIngresoComponent, canDeactivate: [ExitGuard] },
      { path: 'modificar-existente', component: ModificarExistenteComponent, canDeactivate: [ExitGuard] },
    ],
  },
  // --------------------------------------------------------------------
  {
    path: '**',
    component: NotfoundComponent,
    title: 'Error',
  },
];

export default routes;