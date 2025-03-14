import { Component, OnInit } from '@angular/core';
import { SimpleCardComponent } from '../../component/simple-card/simple-card.component';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth/auth.service';
import { User } from '../../interface/user';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-entrar',
  imports: [SimpleCardComponent, RouterModule, CommonModule, FormsModule],
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.css']
})

export class EntrarComponent implements OnInit {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  datosNoGuardados: boolean = false;
  registroExitoso: boolean = false; // Variable para controlar el mensaje
  showResendButton: boolean = false; // controlar el botón de reenvío
  private errorTimeout: any; // Variable para almacenar el timeout

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
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService, 
    private router: Router) {}

    ngOnInit(): void {
      // Leer el parámetro 'registroExitoso' de la URL
      this.route.queryParams.subscribe((params) => {
        if (params['registroExitoso'] === 'true') {
          this.registroExitoso = true; // Mostrar el mensaje
        }
      });}

  onSubmit(): void {
    console.log('onSubmit() llamado. Enviando datos...');
    const userCredentials: Partial<User> = {
      email: this.email,
      password: this.password,
    };
  
    this.authService.loginUser(userCredentials as User).subscribe({
      next: (response: any) => {
        if (response && response.token) {
          // Guardar el token y el rol usando el AuthService
          this.authService.setUserData(response.token, response.role, response.name);

          this.datosNoGuardados = false;

          // Redirigir al usuario según su rol
          if (response.role === 'admin') {
            this.router.navigate(['/gestion']);
          } else {
            this.router.navigate(['/inicio']);
          }
        }
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error en el login:', error);
      
        // Manejar errores condicionalmente
        if (error.status === 401) {
          this.errorMessage = 'Credenciales inválidas, intenta de nuevo.';
        } else if (error.status === 403) {
          this.errorMessage = 'Cuenta no activada. Por favor, revisa tu correo electrónico para activar tu cuenta.';
          this.showResendButton = true; // Mostrar el botón de reenvío
        } else {
          this.errorMessage = 'Ocurrió un error inesperado. Por favor, intenta de nuevo más tarde.';
        }
        this.clearErrorMessage();
      },
    });
  }

    // Método para limpiar el mensaje de error después de 45 segundos
    clearErrorMessage(): void {
      this.errorTimeout = setTimeout(() => {
        this.errorMessage = ''; // Limpiar el mensaje de error
        this.showResendButton = false; // Ocultar el botón de reenvío
      }, 15000); // 45 segundos
    }

  resendActivationEmail(): void {
    const userCredentials: Partial<User> = {
      email: this.email,
      password: this.password,
    };
  
    this.authService.resendActivationEmail(userCredentials as User).subscribe({
      next: (response) => {
        console.log('Correo de activación reenviado:', response);
        this.errorMessage = 'Correo de activación reenviado. Por favor, revisa tu bandeja de entrada.';
        this.showResendButton = false; // Ocultar el botón después de reenviar
        this.clearErrorMessage();
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error al reenviar el correo de activación:', error);
        if (error.status === 422) {
          this.errorMessage = 'Credenciales inválidas. Por favor, verifica tu correo y contraseña.';
        } else if (error.status === 400) {
          this.errorMessage = 'La cuenta ya está activada.';
        } else {
          this.errorMessage = 'Ocurrió un error al reenviar el correo. Por favor, intenta de nuevo más tarde.';
        }
        this.clearErrorMessage();
      },
    });
  }

}