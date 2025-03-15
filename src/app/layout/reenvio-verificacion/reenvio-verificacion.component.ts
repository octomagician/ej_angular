import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SimpleCardComponent } from '../../component/simple-card/simple-card.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../service/auth/auth.service';
import { RouterModule, Router } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { User } from '../../interface/user';

@Component({
  selector: 'app-reenvio-verificacion',
  imports: [FormsModule, SimpleCardComponent, RouterModule, CommonModule],
  templateUrl: './reenvio-verificacion.component.html',
  styleUrl: './reenvio-verificacion.component.css'
})
export class ReenvioVerificacionComponent {
  email: string = '';
  password: string = '';
  mensaje: string = '';

  constructor(private authService: AuthService, 
              private router: Router) {}

  onSubmit(): void {
    console.log('onSubmit() llamado. Enviando datos...');
    this.resendActivationEmail();
  }

  resendActivationEmail(): void {
    const userCredentials: Partial<User> = {
      email: this.email,
      password: this.password,
    };
  
    this.authService.resendActivationEmail(userCredentials as User).subscribe({
      next: (response) => {
        console.log('Correo de activación reenviado:', response);
        this.mensaje = 'Correo de activación reenviado. Por favor, revisa tu bandeja de entrada.';
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error al reenviar el correo de activación:', error);
        if (error.status === 422) {
          this.mensaje = 'Credenciales inválidas. Por favor, verifica tu correo y contraseña.';
        } else if (error.status === 400) {
          this.mensaje = 'La cuenta ya está activada.';
        } else {
          this.mensaje = 'Ocurrió un error al reenviar el correo. Por favor, intenta de nuevo más tarde.';
        }
      },
    });
  }
}