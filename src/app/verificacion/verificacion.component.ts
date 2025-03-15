import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SimpleCardComponent } from '../component/simple-card/simple-card.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../service/auth/auth.service';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-verificacion',
  imports: [FormsModule, SimpleCardComponent, RouterModule, CommonModule],
  templateUrl: './verificacion.component.html',
  styleUrls: ['./verificacion.component.css'],
})
export class VerificacionComponent {
  email: string = '';
  codigo: string = '';
  mensaje: string = '';

  constructor(private authService: AuthService, 
      private router: Router) {}

  verificarCodigo() {
    this.authService.verificarCodigo(this.email, this.codigo).subscribe(
      (response: any) => {
        this.mensaje = response.mensaje;
        this.router.navigate(['/entrar']);
      },
      (error) => {
        this.mensaje = error.error.mensaje || 'Error al verificar el código';
      }
    );
  }
}