import { Routes } from '@angular/router';
// Components
import { HomeComponent } from './layout/home/home.component';
import { NotfoundComponent } from './layout/notfound/notfound.component';
import { EntrarComponent } from './layout/entrar/entrar.component';
import { RegistrarseComponent } from './layout/registrarse/registrarse.component';
import { PerfilComponent } from './layout/perfil/perfil.component';
import { IngresosComponent } from './layout/ingresos/ingresos.component';
import { EstudiosComponent } from './layout/estudios/estudios.component';
import { GestionComponent } from './layout/gestion/gestion.component';
// Guards
import { AuthGuard } from './guard/auth.guard';
import { NoAuthGuard } from './guard/no-auth.guard';
import { AdminGuard } from './guard/admin.guard';
import { ExitGuard } from './guard/exit.guard';

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
  },
  {
    path: 'estudios',
    component: EstudiosComponent,
    title: 'Estudios',
    canActivate: [AuthGuard], // Solo accesible si estás conectado
  },
  {
    path: 'gestion',
    component: GestionComponent,
    title: 'Gestión',
    canActivate: [AdminGuard], // Solo accesible si eres administrador
  },
  {
    path: '**',
    component: NotfoundComponent,
    title: 'Error',
  },
];

export default routes;