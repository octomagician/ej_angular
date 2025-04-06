import { Component, OnInit, OnDestroy } from '@angular/core';
import { SimpleCardComponent } from '../../component/simple-card/simple-card.component';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth/auth.service';
import { User } from '../../interface/user';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription, timer } from 'rxjs';

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

  // Variables para el temporizador
  resendTimer: number = 0;
  timerSubscription: Subscription | null = null;
  isResending: boolean = false;

  private errorTimeout: any;

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

  ngOnDestroy(): void {
    this.clearTimers();
  }
  
  // Métodos relacionados con el manejo del tiempo para reenviar el correo
  private clearTimers(): void {
    if (this.errorTimeout) {
      clearTimeout(this.errorTimeout);
    }
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  startResendTimer(seconds: number): void {
    this.resendTimer = seconds;
    this.showResendButton = false;
    
    this.timerSubscription = timer(0, 1000).subscribe(() => {
      this.resendTimer--;
      
      if (this.resendTimer <= 0) {
        this.showResendButton = true;
        this.timerSubscription?.unsubscribe();
      }
    });
  }

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

  onSubmit(): void {
    console.log('onSubmit() llamado. Enviando datos...');
    const userCredentials: Partial<User> = {
      email: this.email,
      password: this.password,
    };
  
    this.authService.entrar(userCredentials as User).subscribe({
      next: (response: any) => {
        if (response && response.token) {
          
          // Guardar el token y el rol usando el AuthService
          this.authService.setUserData(response.token, response.role, response.username);
          console.log('Token guardado:', response.token);
          console.log('Rol guardado:', response.role);
          console.log('Nombre de usuario guardado:', response.username);

          this.datosNoGuardados = false;
          this.router.navigate(['/inicio']);
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

// Método para reenviar el correo de activación ---------------------------------------
resendActivationEmail(): void {
  if (this.isResending || this.resendTimer > 0) return;
  
  this.isResending = true;
  const userCredentials: Partial<User> = {
      email: this.email,
      password: this.password,
  };

  this.authService.resendActivationEmail(userCredentials as User).subscribe({
      next: (response: any) => {
          this.isResending = false;
          this.errorMessage = 'Nuevo código de verificación enviado. Revisa tu correo.';
          
          // Iniciar temporizador con la respuesta del servidor
          const waitTime = response?.wait_time || 300; // 5 minutos por defecto
          this.startResendTimer(waitTime);
          
          // Opcional: Mostrar hora de expiración
          if (response?.expires_at) {
              console.log('El código expira a las:', response.expires_at);
          }
      },
      error: (error: HttpErrorResponse) => {
          this.isResending = false;
          
          if (error.status === 429) {
              // Manejar error 429 específicamente
              const waitTime = error.error?.wait_time || 300;
              this.errorMessage = error.error?.mensaje || 'Debes esperar antes de reenviar';
              this.startResendTimer(waitTime);
          } else {
              // Manejar otros errores
              this.errorMessage = this.getErrorMessage(error);
          }
          
          this.clearErrorMessage();
      }
  });
}


private getErrorMessage(error: HttpErrorResponse): string {
  switch (error.status) {
      case 400: return 'La cuenta ya está activada.';
      case 401: return 'Credenciales inválidas.';
      case 403: return 'Cuenta no activada. Revisa tu correo.';
      case 422: return 'Datos inválidos. Verifica tu información.';
      default: return 'Error al reenviar el código. Intenta nuevamente.';
  }
}
}