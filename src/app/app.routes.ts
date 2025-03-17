import { Routes } from '@angular/router';
// Components
import { HomeComponent } from './layout/home/home.component';
import { NotfoundComponent } from './layout/notfound/notfound.component';
import { EntrarComponent } from './layout/entrar/entrar.component';
import { RegistrarseComponent } from './layout/registrarse/registrarse.component';
import { VerificacionComponent } from './layout/verificacion/verificacion.component';
import { ReenvioVerificacionComponent } from './layout/reenvio-verificacion/reenvio-verificacion.component';
// CRUD
import { CamaListComponent } from './layout/crud_layouts/cama-list/cama-list.component';
import { CamaFormComponent } from './layout/crud_layouts/cama-form/cama-form.component';
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
    //este que sigue ponerselo al componente de cama
    //canActivate: [AdminGuard], // Solo accesible si eres administrador
  },
  {
    path: 'camas/editar',
    component: CamaListComponent,
    title: 'Camas Editar',
    canActivate: [AdminGuard], // Solo accesible si eres administrador
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