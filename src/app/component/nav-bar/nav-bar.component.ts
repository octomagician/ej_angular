import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../service/auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterModule, CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
 constructor(public authService: AuthService, private router: Router) {}

  // Método para cerrar sesión
  logout(): void {
    this.authService.logout(); // Llama al método logout del AuthService
    this.router.navigate(['/inicio']); // Redirige al usuario a la página de inicio
  }
}
