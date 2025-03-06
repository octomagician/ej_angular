import { Routes } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';
import { NotfoundComponent } from './layout/notfound/notfound.component';
import { EntrarComponent } from './layout/entrar/entrar.component';
import { RegistrarseComponent } from './layout/registrarse/registrarse.component';
import { PerfilComponent } from './layout/perfil/perfil.component';
import { IngresosComponent } from './layout/ingresos/ingresos.component';
import { EstudiosComponent } from './layout/estudios/estudios.component';
import { GestionComponent } from './layout/gestion/gestion.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: HomeComponent,
        title: 'Grey-Sloan Memorial Hospital',
      },
      {
        path: 'entrar',
        component: EntrarComponent,
        title: 'Entrar',
      },
      {
        path: 'registrarse',
        component: RegistrarseComponent,
        title: 'Registrarse',
      },
      {
        path: 'perfil',
        component: PerfilComponent,
        title: 'Perfil',
      },
      {
        path: 'ingresos',
        component: IngresosComponent,
        title: 'Ingresos',
      },
      {
        path: 'estudios',
        component: EstudiosComponent,
        title: 'Estudios',
      },
      {
        path: 'gestion',
        component: GestionComponent,
        title: 'Gestion',
      },
      {
        path: '**',
        component: NotfoundComponent,
        title: 'Error',
      },
];

export default routes;
