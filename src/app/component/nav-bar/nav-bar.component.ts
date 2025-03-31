import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../service/auth/auth.service';
import { CommonModule } from '@angular/common';
import { NotificationsComponent } from '../notifications/notifications.component';
import { SessionService } from '../../service/session-service/session-service.service';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterModule, CommonModule, NotificationsComponent],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css' 
})
export class NavBarComponent implements OnInit{
  username: string | null = null; // Variable para almacenar el nombre del usuario
 constructor(public authService: AuthService, private router: Router, private sessionService: SessionService) {}

  // Método para inicializar el componente
  ngOnInit(): void {
    // Suscribirse al Observable para recibir actualizaciones del nombre
    this.authService.userName$.subscribe((username) => {
      this.username = username;
    });
  }

  // Método para cerrar sesión
  logout(): void {
    this.sessionService.logout().subscribe({
      next: () => {
        this.router.navigate(['/inicio']);
      },
      error: (error) => { // ← Corrige la sintaxis del error
        console.error('Error al cerrar sesión', error);
      }
    });
  }
}
