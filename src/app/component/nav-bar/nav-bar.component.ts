import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../service/auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterModule, CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css' 
})
export class NavBarComponent implements OnInit{
  username: string | null = null; // Variable para almacenar el nombre del usuario
  isAdminUser: boolean = false; // Verificación de rol
  isAuth: boolean = false; // Verificación de autenticación
 constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    console.log('Cookie:', document.cookie); // Verificar la cookie
    // Verificar si ingresó un usuario
    this.authService.isLoggedIn().subscribe((isAuth) => {
      this.isAuth = isAuth; // Actualizar la variable con el valor emitido por el Observable
    });
    console.log('está autenticado?', this.isAuth);

    // Verificar si el usuario es administrador
    this.authService.isAdmin().subscribe((isAdmin) => {
      this.isAdminUser = isAdmin; // Actualizar la variable con el valor emitido por el Observable
    });
    console.log('es admin?', this.isAdminUser);

    // Suscribirse al Observable para recibir actualizaciones del nombre
    this.authService.userName$.subscribe((username) => {
      this.username = username;
    });
  }


  // Método para cerrar sesión
  logout(): void {
    this.authService.salir().subscribe(
      () => {
        this.router.navigate(['/inicio']); // Redirige al usuario a la página de inicio
      },
      error => {
        console.error('Error al cerrar sesión', error);
      }
    );
  }
}
