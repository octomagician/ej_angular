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
// Hijos
import { HistoriaClinicaComponent } from './layout/miniform/historia-clinica/historia-clinica.component';
import { ModificarExistenteComponent } from './layout/miniform/modificar-existente/modificar-existente.component';
import { NuevoIngresoComponent } from './layout/miniform/nuevo-ingreso/nuevo-ingreso.component';
import { PrimeraVezComponent } from './layout/miniform/primera-vez/primera-vez.component';
import { RegistrarNuevaInformacionComponent } from './layout/miniform/registrar-nueva-informacion/registrar-nueva-informacion.component';
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
    children: [
      { path: 'nuevo-ingreso', component: NuevoIngresoComponent, canDeactivate: [ExitGuard] },
      { path: 'primera-vez', component: PrimeraVezComponent, canDeactivate: [ExitGuard] },
      { path: 'modificar-existente', component: ModificarExistenteComponent, canDeactivate: [ExitGuard] },
      { path: 'registrar-nueva-informacion', component: RegistrarNuevaInformacionComponent, canDeactivate: [ExitGuard] },
      { path: 'historia-clinica', component: HistoriaClinicaComponent, canDeactivate: [ExitGuard] },
    ],
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