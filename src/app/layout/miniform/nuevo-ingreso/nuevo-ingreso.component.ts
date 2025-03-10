import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../service/auth/auth.service';
import { SimpleCardComponent } from '../../../component/simple-card/simple-card.component';

@Component({
  selector: 'app-nuevo-ingreso',
  standalone: true,
  imports: [CommonModule, FormsModule, SimpleCardComponent],
  templateUrl: './nuevo-ingreso.component.html',
  styleUrls: ['./nuevo-ingreso.component.css'],
})

export class NuevoIngresoComponent {
  // Usuario
  name: string = '';
  email: string = '';
  password: string = '';
  password_confirmation: string = '';

  // Persona
  nombre: string = '';
  apellido_paterno: string = '';
  apellido_materno: string = '';
  sexo: string = '';

  // Paciente
  nacimiento: string = '';
  nss: string = '';
  direccion: string = '';
  tel_1: string = '';
  tel_2: string = '';

  // otros
  errorMessage: string = '';
  datosNoGuardados: boolean = false;
  successMessage: string = '';

  constructor(
    private authService: AuthService, // Servicio de autenticación
    private router: Router // Router para redireccionar
  ) {}

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

    // Se llama cada vez que el usuario interactúa con el formulario
    onInputChange() {
      const formularioVacio =
        !this.name &&
        !this.email &&
        !this.password &&
        !this.nombre &&
        !this.apellido_paterno &&
        !this.apellido_materno &&
        !this.sexo &&
        !this.nacimiento &&
        !this.nss &&
        !this.direccion &&
        !this.tel_1 &&
        !this.tel_2;
  
      if (formularioVacio) {
        console.log('Formulario vacío. Marcando datosNoGuardados como false.');
        this.datosNoGuardados = false;
      } else {
        console.log('Se detectaron cambios en el formulario. Marcando datosNoGuardados como true.');
        this.datosNoGuardados = true;
      }
    }

  // Enviar el formulario
  onSubmit(): void {
    const newPaciente = {
      // Usuario
      name: this.name,
      email: this.email,
      password: this.password,
      password_confirmation: this.password_confirmation,
      // Persona
      nombre: this.nombre,
      apellido_paterno: this.apellido_paterno,
      apellido_materno: this.apellido_materno,
      sexo: this.sexo,
      // Paciente
      nacimiento: this.nacimiento,
      nss: this.nss,
      direccion: this.direccion,
      tel_1: this.tel_1,
      tel_2: this.tel_2,
    };

    this.authService.registerPaciente(newPaciente).subscribe({
      next: (response) => {
        this.successMessage = 'Paciente registrado con éxito.';
        this.clearForm();
      },
      error: (error) => {
        console.error(error);
        this.errorMessage = 'No se pudo registrar al paciente. Inténtalo de nuevo.';
      },
    });
    this.datosNoGuardados = false;
  }

    // Método para vaciar el formulario
    clearForm(): void {
      this.name = '';
      this.email = '';
      this.password = '';
      this.password_confirmation = '';
      this.nombre = '';
      this.apellido_paterno = '';
      this.apellido_materno = '';
      this.sexo = '';
      this.nacimiento = '';
      this.nss = '';
      this.direccion = '';
      this.tel_1 = '';
      this.tel_2 = '';
      this.datosNoGuardados = false; // Restablece el estado del formulario
    }
}