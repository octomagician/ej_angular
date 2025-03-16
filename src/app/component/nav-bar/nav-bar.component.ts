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
 constructor(public authService: AuthService, private router: Router) {}

  // Método para inicializar el componente
  ngOnInit(): void {
    // Suscribirse al Observable para recibir actualizaciones del nombre
    this.authService.userName$.subscribe((username) => {
      this.username = username;
    });
  }

  // Método para cerrar sesión
  logout(): void {
    this.authService.logout(); // Llama al método logout del AuthService
    this.router.navigate(['/inicio']); // Redirige al usuario a la página de inicio
  }
}
