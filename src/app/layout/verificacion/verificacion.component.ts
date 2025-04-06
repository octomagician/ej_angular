import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SimpleCardComponent } from '../../component/simple-card/simple-card.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../service/auth/auth.service';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-verificacion',
  imports: [FormsModule, SimpleCardComponent, RouterModule, CommonModule],
  templateUrl: './verificacion.component.html',
  styleUrls: ['./verificacion.component.css'],
})
export class VerificacionComponent {
  mensaje: string = '';
  verificationCode: string = '';
  verifyUrl: string = '';
  verified: boolean = false;

  constructor(private authService: AuthService, 
      private router: Router, private route: ActivatedRoute,
      private http: HttpClient,) {}

      ngOnInit() {
        this.route.queryParams.subscribe(params => {
          this.verifyUrl = decodeURIComponent(params['verify_url'] || '');
          this.verificationCode = params['code'] || ''; 
        });
        console.log("iniciando con este verifyURL:", this.verifyUrl);
      }

    verify() {
      if (!this.verifyUrl || !this.verificationCode) {
          alert('Por favor ingresa el código de verificación');
          console.log("verifyUrl o verificationCode no están definidos");
          return;
      }
  
      this.http.get(this.verifyUrl).subscribe({
          next: (response: any) => {
              this.verified = true;
              this.mensaje = '¡Cuenta verificada con éxito!';
              // Redirigir después de 2 segundos
              setTimeout(() => {
                  this.router.navigate(['/entrar']);
              }, 2000);
          },
          error: (error) => {
            console.log("después de hacer la petición get, algo salió mal", error);
              console.error('Error en verificación:', error);
              this.mensaje = error.error?.message || 'Error al verificar el código';
          }
      });
  }
}