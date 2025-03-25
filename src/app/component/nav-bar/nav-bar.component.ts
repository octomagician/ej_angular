import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../service/auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterModule, CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent implements OnInit {
  username: string | null = null; // Variable para almacenar el nombre del usuario
  isAdminUser: boolean = false; // Verificación de rol
  isAuth: boolean = false; // Verificación de autenticación

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Suscribirse al estado de autenticación
    this.authService.isAuthenticated$.subscribe((isAuthenticated) => {
      this.isAuth = isAuthenticated; // Actualizar el estado de autenticación
      console.log('Desde el Navbar, Usuario autenticado:', this.isAuth);

      // Si el usuario está autenticado, verificar si es administrador
      if (isAuthenticated) {
        this.authService.isAdmin().subscribe((isAdmin) => {
          this.isAdminUser = isAdmin; // Actualizar el estado del rol
          console.log('Desde el Navbar, Estado de Administrador:', this.isAdminUser);
        });
      } else {
        this.isAdminUser = false; // Si no está autenticado, no es administrador
        console.log('Desde el Navbar, Estado de Administrador:', this.isAdminUser);
      }
    });

    // Suscribirse al Observable para recibir actualizaciones del nombre
    this.authService.userName$.subscribe((username) => {
      this.username = username;
      console.log('Desde el Navbar, Nombre de Usuario:', this.username);
    });
  }

  // Método para cerrar sesión
  logout(): void {
    this.authService.salir().subscribe(
      () => {
        this.router.navigate(['/inicio']); // Redirige al usuario a la página de inicio
      },
      (error) => {
        console.error('Error al cerrar sesión', error);
      }
    );
  }
}