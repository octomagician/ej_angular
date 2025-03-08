import { Component } from '@angular/core';
import { SimpleCardComponent } from '../../component/simple-card/simple-card.component';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth/auth.service';
import { User } from '../../interface/user';

@Component({
  selector: 'app-entrar',
  imports: [SimpleCardComponent, RouterModule, CommonModule, FormsModule],
  templateUrl: './entrar.component.html',
  styleUrl: './entrar.component.css'
})

export class EntrarComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  datosNoGuardados: boolean = false;

  // Método del Guard Exit
  check(): boolean {
    console.log('check() llamado. Comprobando si hay cambios sin guardar...');
    if (this.datosNoGuardados) {
      console.log('Hay cambios sin guardar. Mostrando confirmación...');
      const confirmacion = confirm('¿Seguro que quieres salir sin enviar los datos?');
      console.log('Confirmación del usuario:', confirmacion);
      return confirmacion;
    }
    console.log('No hay cambios sin guardar. Permitiendo salir...');
    return true;
  }

  // Para que se detecte si el formulario cambió
  onInputChange() {
    const formularioVacio = !this.email && !this.password;
    
    if (formularioVacio) {
      console.log('Formulario vacío. Marcando datosNoGuardados como false.');
      this.datosNoGuardados = false;
    } else {
      console.log('Se detectaron cambios en el formulario. Marcando datosNoGuardados como true.');
      this.datosNoGuardados = true;
    }
  }

  // inyección de dependencias, instancian el servicio de auth y el de router
  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
  console.log('onSubmit() llamado. Enviando datos...');
  const userCredentials: Partial<User> = {
    email: this.email,
    password: this.password,
  };

  this.authService.registerUser(userCredentials as User).subscribe({
    next: (response) => {
      console.log('Respuesta del servidor recibida:', response);
      localStorage.setItem('token', response.token);
      this.datosNoGuardados = false;
      console.log('Navegando a /home...');
      this.router.navigate(['/home']);
    },
    error: () => {
      console.error('Error en el login. Mostrando mensaje de error...');
      this.errorMessage = 'Credenciales inválidas, intenta de nuevo.';
    },
  });
}

}