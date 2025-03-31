import { Component } from '@angular/core';
import { AuthService } from '../../service/auth/auth.service';
import { Router } from '@angular/router';
import { SimpleCardComponent } from '../../component/simple-card/simple-card.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  imports: [SimpleCardComponent, CommonModule, FormsModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})

export class ChangePasswordComponent {
  currentPassword = '';
  newPassword = '';
  confirmPassword = '';
  errorMessage = '';
  successMessage = '';
  loading = false;
  datosNoGuardados: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden';
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const data = {
      current_password: this.currentPassword,
      new_password: this.newPassword,
      new_password_confirmation: this.confirmPassword
    };

    this.authService.changePassword(data).subscribe({
      next: (response) => {
        this.loading = false;
        this.successMessage = 'Contraseña cambiada exitosamente';
        this.datosNoGuardados = false;
        setTimeout(() => this.router.navigate(['/perfil']), 2000);
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = error.error?.message || 
                          'Error al cambiar la contraseña. Inténtalo de nuevo.';
      }
    });
  }

  goBack() {
    this.router.navigate(['/perfil']);
  }

 // Método del Guard Exit
 check(): boolean {
  if (this.datosNoGuardados) {
    const confirmacion = confirm('¿Seguro que quieres salir sin guardar los cambios?');
    if (confirmacion) {
      // Resetear los valores si el usuario confirma
      this.currentPassword = '';
      this.newPassword = '';
      this.confirmPassword = '';
    }
    return confirmacion;
  }
  return true;
}

// Se llama cada vez que el usuario interactúa con el formulario
onInputChange() {
  // Verifica si al menos un campo tiene valor
  this.datosNoGuardados = !!(
    this.currentPassword.trim() || 
    this.newPassword.trim() || 
    this.confirmPassword.trim()
  );
  
  console.log('Cambios detectados. datosNoGuardados:', this.datosNoGuardados);
}
}
